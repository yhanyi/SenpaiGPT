"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { database } from "../firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  chatId: string;
};

export default function Chat({ chatId }: Props) {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(
          database,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
}
