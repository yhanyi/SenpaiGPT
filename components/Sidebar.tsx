import React from "react";
import NewChat from "./NewChat";

export default function Sidebar() {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div>
        <NewChat />
        {/* ModelSelection */}
        {/* Map through the chats */}
      </div>
    </div>
  );
}
