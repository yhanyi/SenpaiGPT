"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { database } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function NewChat() {
  const { data: session } = useSession();
  const router = useRouter();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(database, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusCircleIcon width={25} height={25} />
      <p>New Chat</p>
    </div>
  );
}
