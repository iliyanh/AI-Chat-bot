"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

//import { useState, useEffect } from "react";

export default function Home() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (chatHistory.length === 0) {
      setChatHistory([{ type: "user", message: inputMessage }]);
    } else {
      setChatHistory((oldMessages) => [
        ...oldMessages,
        { type: "user", message: inputMessage },
      ]);
    }
    setInputMessage("");
    console.log(chatHistory);
  };

  return (
    <div className="container">
      {/* <!-- Chatbox --> */}
      <div className="chatbox">
        {/* <!-- Top Section --> */}
        <div className="top-chatbox-section">
          <div className="name logo">
            <span>TalkBuddy</span>
            <i className="fa-solid fa-robot"></i>
          </div>
        </div>
        {/* <!-- Chat --> */}
        <div className="chat-section">
          {chatHistory.map((message, index) => {
            return (
              <div
                key={index}
                className={message.type === "user" ? "client-chat" : "bot-chat"}
              >
                {message.message}
              </div>
            );
          })}
        </div>
        {/* <!-- Input Section --> */}
        <form className="input-section" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Message TalkBuddy"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.currentTarget.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-circle-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
