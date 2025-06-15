import React from "react";

export default function ChatMessage({ message, sender }) {
  return (
    <div
      style={{
        textAlign: sender === "user" ? "right" : "left",
        margin: "5px 0"
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "8px",
          borderRadius: "8px",
          background: sender === "user" ? "#4cafef" : "#e5e5e5",
          color: sender === "user" ? "#fff" : "#000"
        }}
      >
        {message}
      </span>
    </div>
  );
}
