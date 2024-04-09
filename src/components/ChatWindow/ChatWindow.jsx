// import React, { useState, useEffect, useRef } from "react";
// import QuestionAskField from "../QuestionAskField/QuestionAskField";
// import styles from "./ChatWindow.module.css";
// import UserIcon from "../../assets/user-icon.png";
// import AiIcon from "../../assets/ai-icon.png";

// const ChatWindow = ({ conversationId, onAskQuestion }) => {
//   const [messages, setMessages] = useState([]);
//   const messageContainerRef = useRef(null);

//   useEffect(() => {
//     const savedMessages =
//       JSON.parse(localStorage.getItem(`conversation_${conversationId}`)) || [];
//     setMessages(savedMessages);
//   }, [conversationId]);

//   useEffect(() => {
//     if (messageContainerRef.current) {
//       messageContainerRef.current.scrollTop =
//         messageContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleAskQuestion = (question) => {
//     if (!conversationId) {
//       onAskQuestion(question);
//     } else {
//       const conversationsData = require("../../data/conversations.json");
//       const answer = conversationsData.find(
//         (conversation) => conversation.question === question
//       )?.response;

//       const updatedMessages = [
//         ...messages,
//         { text: question, sender: "User" },
//         {
//           text: answer || "Sorry, I don't have an answer for that.",
//           sender: "AI",
//         },
//       ];

//       setMessages(updatedMessages);
//       localStorage.setItem(
//         `conversation_${conversationId}`,
//         JSON.stringify(updatedMessages)
//       );
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.container}>
//         <div
//           ref={messageContainerRef}
//           className={styles.textContainer}
//           style={{ maxHeight: "calc(100vh - 150px)", overflow: "auto" }}
//         >
//           {Array.isArray(messages) &&
//             messages.map((message, index) =>
//               message.text ? (
//                 <div
//                   key={index}
//                   className={
//                     message.sender === "User"
//                       ? styles.userMessageContainer
//                       : styles.aiMessageContainer
//                   }
//                 >
//                   <div className={styles.messageContainer}>
//                     <div className={styles.messageContent}>
//                       <img
//                         src={message.sender === "User" ? UserIcon : AiIcon}
//                         alt={
//                           message.sender === "User" ? "User Icon" : "AI Icon"
//                         }
//                         className={styles.icon}
//                       />
//                       <div className={styles.messageText}>
//                         <div className={styles.senderName}>
//                           {message.sender === "User" ? "User" : "AI"}
//                         </div>
//                         <div>{message.text}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : null
//             )}
//         </div>
//       </div>
//       <div>
//         <QuestionAskField onAskQuestion={handleAskQuestion} />
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useState, useEffect, useRef } from "react";
import QuestionAskField from "../QuestionAskField/QuestionAskField";
import styles from "./ChatWindow.module.css";
import UserIcon from "../../assets/user-icon.png";
import AiIcon from "../../assets/ai-icon.png";

const ChatWindow = ({ conversationId, onAskQuestion }) => {
  const [messages, setMessages] = useState([]);
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

  const handleAskQuestion = (question) => {
    if (!conversationId) {
      onAskQuestion(question);
    } else {
      const conversationsData = require("../../data/conversations.json");
      const answer = conversationsData.find(
        (conversation) => conversation.question === question
      )?.response;

      const updatedMessages = [
        ...messages,
        { text: question, sender: "User" },
        {
          text: answer || "Sorry, I don't have an answer for that.",
          sender: "AI",
        },
      ];

      setMessages(updatedMessages);
      localStorage.setItem(
        `conversation_${conversationId}`,
        JSON.stringify(updatedMessages)
      );
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
      ) : (
        <div className={styles.container}>
          <div className={styles.centered}>
            <h1>Hii</h1>
          </div>
        </div>
      )}
      <div>
        <QuestionAskField onAskQuestion={handleAskQuestion} />
      </div>
    </div>
  );
};

export default ChatWindow;
