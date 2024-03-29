import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDatabase } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
    return;
  }

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "SenpaiGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "SenpaiGPT",
      name: "SenpaiGPT",
      avatar:
        "https://cdn.donmai.us/original/5d/15/__texas_arknights_drawn_by_huang_qing_ye__5d15cb4dd43a97ea14b903c5996f60ac.jpg",
    },
  };

  await adminDatabase
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
