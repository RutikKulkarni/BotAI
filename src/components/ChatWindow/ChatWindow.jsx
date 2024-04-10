import React, { useState, useEffect, useRef } from "react";
import QuestionAskField from "../QuestionAskField/QuestionAskField";
import styles from "./ChatWindow.module.css";
import UserIcon from "../../assets/user-icon.png";
import AiIcon from "../../assets/ai-icon.png";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const ChatWindow = ({ conversationId, onAskQuestion }) => {
  const [messages, setMessages] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem(`conversation_${conversationId}`)) || [];
    setMessages(savedMessages);
  }, [conversationId]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleAskQuestion = (question) => {
    const currentTime = getCurrentTime();
    if (!conversationId) {
      onAskQuestion(question);
    } else {
      const conversationsData = require("../../data/conversations.json");
      const answer = conversationsData.find(
        (conversation) => conversation.question === question
      )?.response;

      const updatedMessages = [
        ...messages,
        { text: question, sender: "User", time: currentTime },
        {
          text: answer || "Sorry, I don't have an answer for that.",
          sender: "AI",
          time: currentTime,
        },
      ];

      setMessages(updatedMessages);
      localStorage.setItem(
        `conversation_${conversationId}`,
        JSON.stringify(updatedMessages)
      );
    }
  };

  const handleClickQuestion = (question) => {
    setSelectedQuestion(question);
    handleAskQuestion(question);
  };

  const handleLikeDislike = (index, like) => {
    // Logic for handling like and dislike removed
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.botName}>
        <span>BotAI</span>
      </div>
      {conversationId ? (
        <div className={styles.container}>
          <div
            ref={messageContainerRef}
            className={styles.textContainer}
            style={{ maxHeight: "calc(100vh - 150px)", overflow: "auto" }}
          >
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
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(-1)}
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
                          <div className={styles.messageTime}>
                            {message.time}
                            {message.sender === "AI" &&
                            (index === messages.length - 1 ||
                              index === hoverIndex) ? (
                              <div className={styles.feedbackButtons}>
                                <AiOutlineLike
                                  onClick={() => handleLikeDislike(index, true)}
                                />
                                <AiOutlineDislike
                                  onClick={() =>
                                    handleLikeDislike(index, false)
                                  }
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.centered}>
            <h1>How Can I Help You Today?</h1>
            <div className={styles.homeIcon}>
              <img src={AiIcon} alt="AI Icon" />
            </div>
            <div className={styles.questionContainer}>
              <div
                className={styles.question}
                onClick={() =>
                  handleClickQuestion(
                    "How do you handle data persistence in mobile applications?"
                  )
                }
              >
                <h3>
                  How do you handle data persistence in mobile applications?
                </h3>
                <span className={styles.spanText}>
                  Get immediate AI generated response
                </span>
              </div>
              <div
                className={styles.question}
                onClick={() =>
                  handleClickQuestion(
                    "Can you explain the concept of domain-driven design?"
                  )
                }
              >
                <h3>Can you explain the concept of domain-driven design?</h3>
                <span className={styles.spanText}>
                  Get immediate AI generated response
                </span>
              </div>
              <div
                className={styles.question}
                onClick={() =>
                  handleClickQuestion(
                    "What is the role of machine learning in web development?"
                  )
                }
              >
                <h3>
                  What is the role of machine learning in web development?
                </h3>
                <span className={styles.spanText}>
                  Get immediate AI generated response
                </span>
              </div>
              <div
                className={styles.question}
                onClick={() =>
                  handleClickQuestion(
                    "How do you stay updated with the latest technology trends?"
                  )
                }
              >
                <h3>
                  How do you stay updated with the latest technology trends?
                </h3>
                <span className={styles.spanText}>
                  Get immediate AI generated response
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <QuestionAskField
          onAskQuestion={handleAskQuestion}
          // initialQuestion={selectedQuestion}
          autoSubmit
        />
      </div>
    </div>
  );
};

export default ChatWindow;
