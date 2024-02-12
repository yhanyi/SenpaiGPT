/* eslint-disable @next/next/no-img-element */
import React from "react";
import { DocumentData } from "firebase-admin/firestore";

type Props = {
  message: DocumentData;
};

export default function Message({ message }: Props) {
  const isSenpaiGPT = message.user.name === "SenpaiGPT";

  return (
    <div className={`py-5 text-white ${isSenpaiGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="" className="h-8 w-8" />
        <p>{message.text}</p>
      </div>
    </div>
  );
}
