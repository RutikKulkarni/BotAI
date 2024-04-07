import React, { useState, useEffect } from "react";
import QuestionAskField from "../QuestionAskField/QuestionAskField";
import conversations from "../../data/conversations.json";
import styles from "./ChatWindow.module.css";
import UserIcon from "../../assets/user-icon.png"; 
import AiIcon from "../../assets/ai-icon.png";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(
      conversations.map((conversation) => ({
        ...conversation,
        sender: "AI", 
      }))
    );
  }, []);

  const handleAskQuestion = (question) => {
    const answer = conversations.find(
      (conversation) => conversation.question === question
    )?.response;
    const newMessages = [
      ...messages,
      { text: question, sender: "User" },
      {
        text: answer || "Sorry, I don't have an answer for that.",
        sender: "AI",
      },
    ];
    setMessages(newMessages);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          {messages.map((message, index) =>
            message.text ? (
              <div
                key={index}
                className={
                  message.sender === "User"
                    ? styles.userMessageContainer
                    : styles.aiMessageContainer
                }
              >
                <div className={styles.messageContainer}>
                  <div className={styles.messageContent}>
                    <img
                      src={message.sender === "User" ? UserIcon : AiIcon}
                      alt={message.sender === "User" ? "User Icon" : "AI Icon"}
                      className={styles.icon}
                    />
                    <div className={styles.messageText}>
                      <div className={styles.senderName}>
                        {message.sender === "User" ? "User" : "AI"}
                      </div>
                      <div>{message.text}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
      <div>
        <QuestionAskField onAskQuestion={handleAskQuestion} />
      </div>
    </div>
  );
};

export default ChatWindow;
