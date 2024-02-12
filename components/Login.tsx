"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

import React from "react";
import LoginButton from "./LoginButton";

export default function Login() {
  return (
    <div className="bg-[#343541] h-screen flex flex-col items-center justify-center text-center gap-10">
      <Image
        src="/senpai-gpt-icon.png"
        width={200}
        height={200}
        alt="Logo"
        className="border border-white rounded-2xl"
      />
      <div onClick={() => signIn("google")}>
        <LoginButton />
      </div>
    </div>
  );
}
