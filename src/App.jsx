import React, { useState } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_KEY = ""; // Replace with your key
  const MODEL = "gemini-1.5-flash"; // Example

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { message: input, sender: "user" };
    setMessages([...messages, userMsg]);
    setInput("");

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: input }] }]
        }
      );

      const botReply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini";

      setMessages((prev) => [...prev, { message: botReply, sender: "bot" }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { message: "Error fetching response", sender: "bot" }
      ]);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>🌱 Gemini Chatbot</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll"
        }}
      >
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} {...msg} />
        ))}
      </div>

      <div style={{ marginTop: "10px", display: "flex" }}>
        <input
          style={{ flex: 1, padding: "10px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} style={{ padding: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
}
