"use client";
require('dotenv').config();
import Image from "next/image";
import styles from "./page.module.css";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const key = process.env.OPENAI_API_KEY;

  const submitHandler = (e) => {
    e.preventDefault();

    setChatHistory((oldMessages) => [
      ...oldMessages,
      { type: "user", message: inputMessage },
    ]);
    chatRequest(inputMessage);

    setInputMessage("");
  };

  const chatRequest = (message) => {
    const url = "/api/chat";
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${key}`,
    // };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    setIsLoading(true);

    axios.post(url, data).then((response) => {
      setChatHistory((oldMessages) => [
        ...oldMessages,
        { type: "bot", message: response.data.choices[0].message.content }
      ])
      setIsLoading(false)
    });
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
          {
            isLoading &&
            <div className="bot-chat">Thinking...</div>
          }
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
