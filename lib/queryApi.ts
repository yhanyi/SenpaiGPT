"use client";

import openai from "./chatgpt";

export default async function query(
  prompt: string,
  chatId: string,
  model: string
) {
  const maxRetries = 3;
  let retries = 0;

  async function fetchCompletion() {
    try {
      const completion = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.OPENAI_API_KEY,
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: prompt },
            ],
          }),
        }
      );

      if (!completion.ok) {
        if (completion.status === 429 && retries < maxRetries) {
          // Retry after a delay with exponential backoff
          const delay = Math.pow(2, retries) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          retries++;
          return fetchCompletion();
        } else {
          throw new Error(`Request failed with status ${completion.status}`);
        }
      }

      const data = await completion.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching data.");
    }
  }

  return fetchCompletion();
}

// Not using until I figure out how to implement the prompts into type ChatCompletionCreateParamsNonStreaming.
export async function queryOld(prompt: string, chatId: string, model: string) {
  const completion = await openai.completions
    .create({
      model,
      prompt,
      max_tokens: 1000,
    })
    .then((res) => res.choices[0].text)
    .catch(
      (err) =>
        `SenpaiGPT was unable to find an answer for that! (Error: ${err.message}`
    );

  return completion;
}
