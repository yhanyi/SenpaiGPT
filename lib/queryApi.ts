"use client";

import openai from "./chatgpt";

export default async function query(
  prompt: string,
  chatId: string,
  model: string
) {
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
