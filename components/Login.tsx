"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

import React from "react";

export default function Login() {
  return (
    <div className="bg-[#343541] h-screen flex flex-col items-center justify-center text-center">
      <Image src="/senpai-gpt-icon.png" width={200} height={200} alt="Logo" />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In
      </button>
    </div>
  );
}
