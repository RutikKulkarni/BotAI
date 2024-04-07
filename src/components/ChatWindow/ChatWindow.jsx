import React, { useState, useEffect } from "react";
import QuestionAskField from "../QuestionAskField/QuestionAskField";
import styles from "./ChatWindow.module.css";
import UserIcon from "../../assets/user-icon.png";
import AiIcon from "../../assets/ai-icon.png";

const ChatWindow = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem(`conversation_${conversationId}`)) || [];
    setMessages(savedMessages);
  }, [conversationId]);

  const handleAskQuestion = (question) => {
    const conversations = require("../../data/conversations.json");
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
    localStorage.setItem(
      `conversation_${conversationId}`,
      JSON.stringify(newMessages)
    );
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          {Array.isArray(messages) &&
            messages.map((message, index) =>
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
                        alt={
                          message.sender === "User" ? "User Icon" : "AI Icon"
                        }
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
