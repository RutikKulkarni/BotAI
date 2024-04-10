import React, { useState, useEffect, useRef } from "react";
import QuestionAskField from "../QuestionAskField/QuestionAskField";
import styles from "./ChatWindow.module.css";
import UserIcon from "../../assets/user-icon.png";
import AiIcon from "../../assets/ai-icon.png";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Modal from "../Modal/Modal";
import { TbBulb } from "react-icons/tb";
import Rating from "react-rating";

const ChatWindow = ({ conversationId, onAskQuestion, questions }) => {
  const [messages, setMessages] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackMessageIndex, setFeedbackMessageIndex] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
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

  const getResponseForQuestion = (question) => {
    const conversationsData = require("../../data/conversations.json");
    const response = conversationsData.find(
      (conversation) => conversation.question === question
    )?.response;
    return response || "Sorry, I don't have an answer for that.";
  };

  const handleAskQuestion = (question) => {
    const currentTime = getCurrentTime();
    if (!conversationId) {
      onAskQuestion(question);
    } else {
      const answer = getResponseForQuestion(question);

      const updatedMessages = [
        ...messages,
        { text: question, sender: "User", time: currentTime },
        {
          text: answer,
          sender: "AI",
          time: currentTime,
          rating: null,
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
    if (like) {
      setShowRatingModal(true);
      setFeedbackMessageIndex(index);
    } else {
      setShowModal(true);
      setFeedbackMessageIndex(index);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowRatingModal(false);
  };

  const submitFeedback = (feedback) => {
    if (feedbackMessageIndex !== null) {
      const updatedMessages = [...messages];
      updatedMessages[feedbackMessageIndex].feedback = feedback;
      setMessages(updatedMessages);
      localStorage.setItem(
        `conversation_${conversationId}`,
        JSON.stringify(updatedMessages)
      );
      setFeedbackMessageIndex(null);
      closeModal();
      setFeedback("");
    }
  };

  const submitRating = () => {
    setShowRatingModal(false);
    const updatedMessages = [...messages];
    updatedMessages[feedbackMessageIndex].rating = selectedRating;
    setMessages(updatedMessages);
    localStorage.setItem(
      `conversation_${conversationId}`,
      JSON.stringify(updatedMessages)
    );
    closeModal();
    setSelectedRating(0);
  };

  const handleAskQuestionInActiveConversation = (question) => {
    if (conversationId) {
      handleAskQuestion(question);
    }
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
                          <div className={styles.buttonsAndTime}>
                            <div className={styles.messageTime}>
                              {message.time}
                            </div>
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
                          {message.rating && (
                            <div className={styles.rating}>
                              <span>
                                <b>Rating: </b>
                              </span>
                              <Rating
                                initialRating={message.rating}
                                readonly
                                emptySymbol={
                                  <span
                                    style={{ color: "gray", fontSize: "18px" }}
                                  >
                                    ☆
                                  </span>
                                }
                                fullSymbol={
                                  <span
                                    style={{ color: "gold", fontSize: "18px" }}
                                  >
                                    ★
                                  </span>
                                }
                              />
                            </div>
                          )}
                          {message.feedback && (
                            <div className={styles.feedback}>
                              <span>
                                <b>Feedback:</b> {message.feedback}
                              </span>
                            </div>
                          )}
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
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={styles.question}
                  onClick={() => handleClickQuestion(question)}
                >
                  <h3>{question}</h3>
                  <span className={styles.spanText}>
                    Get immediate AI generated response
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div>
        <QuestionAskField
          onAskQuestion={handleAskQuestionInActiveConversation}
          autoSubmit
        />
      </div>
      <Modal isOpen={showModal || showRatingModal} onClose={closeModal}>
        {showModal ? (
          <>
            <h2 style={{ color: "black", marginBottom: "20px" }}>
              <TbBulb style={{ marginRight: "2px" }} /> Provide Additional
              Feedback
            </h2>
            <div className={styles.inputContainer}>
              <textarea
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={styles.textArea}
                required
              />
              <button
                onClick={() => submitFeedback(feedback)}
                className={styles.submitButton}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ color: "black", marginBottom: "20px" }}>
              Rate this response
            </h2>
            <div className={styles.ratingContainer}>
              <Rating
                onChange={(value) => setSelectedRating(value)}
                initialRating={selectedRating}
                emptySymbol={<span style={{ color: "gray" }}>☆</span>}
                fullSymbol={<span style={{ color: "gold" }}>★</span>}
              />
            </div>
            <button onClick={submitRating} className={styles.submitButton}>
              Submit
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ChatWindow;
