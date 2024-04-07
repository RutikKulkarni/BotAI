// ChatWindow.jsx
import React, { useState, useEffect } from "react";
import styles from "./ChatWindow.module.css";
import QuestionAskField from "../QuestionAskField/QuestionAskField";
import conversations from "../../data/conversations.json";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(conversations);
  }, []);

  const handleAskQuestion = (question) => {
    const answer = conversations.find(
      (conversation) => conversation.question === question
    )?.response;
    const newMessages = [
      ...messages,
      { text: question, isUser: true },
      {
        text: answer || "Sorry, I don't have an answer for that.",
        isUser: false,
      },
    ];
    setMessages(newMessages);
  };

  return (
    <div className={styles["chat-window-container"]}>
      <div className={styles["chat-window"]}>
        {messages.map(
          (message, index) =>
            message.text && (
              <div
                className={`${styles.message} ${
                  message.isUser ? styles["user-message"] : styles["ai-message"]
                }`}
                key={index}
              >
                {message.text}
              </div>
            )
        )}
      </div>
      <div className={styles["question-ask-container"]}>
        <QuestionAskField onAskQuestion={handleAskQuestion} />
      </div>
    </div>
  );
};

export default ChatWindow;
