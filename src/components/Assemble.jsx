import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow/ChatWindow";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

const Assemble = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const savedConversations =
      JSON.parse(localStorage.getItem("savedConversations")) || [];
    setConversations(savedConversations);

    const savedActiveConversation = localStorage.getItem("activeConversation");
    if (savedActiveConversation) {
      setActiveConversation(parseInt(savedActiveConversation));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedConversations", JSON.stringify(conversations));
  }, [conversations]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation.id);
    localStorage.setItem("activeConversation", conversation.id);
  };

  const handleStartNewConversation = () => {
    const newConversationId = Date.now();
    const newConversationTitle = `Conversation ${conversations.length + 1}`;
    const newConversation = {
      id: newConversationId,
      title: newConversationTitle,
      messages: [],
    };
    setConversations([...conversations, newConversation]);
    setActiveConversation(newConversationId);
    localStorage.setItem("activeConversation", newConversationId);
  };

  const handleDeleteConversation = (conversationId) => {
    const updatedConversations = conversations.filter(
      (conversation) => conversation.id !== conversationId
    );
    setConversations(updatedConversations);
    localStorage.setItem(
      "savedConversations",
      JSON.stringify(updatedConversations)
    );

    if (activeConversation === conversationId) {
      setActiveConversation(null);
      localStorage.removeItem("activeConversation");
    }
  };

  const handleRenameConversation = (conversationId, newTitle) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, title: newTitle }
          : conversation
      )
    );
  };

  const questions = [
    "How do you handle data persistence in mobile applications?",
    "Can you explain the concept of domain-driven design?",
    "What is the role of machine learning in web development?",
    "How do you stay updated with the latest technology trends?",
  ];

  const handleAskQuestionInActiveConversation = (question) => {
    if (activeConversation) {
      handleAskQuestion(question, activeConversation);
    } else {
      const newConversationId = Date.now();
      const newConversationTitle = `Conversation ${conversations.length + 1}`;
      const newConversation = {
        id: newConversationId,
        title: newConversationTitle,
        messages: [],
      };
      setConversations([...conversations, newConversation]);
      setActiveConversation(newConversationId);
      localStorage.setItem("activeConversation", newConversationId);
      handleAskQuestion(question, newConversationId);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleAskQuestion = (question, conversationId) => {
    const currentTime = getCurrentTime();
    const conversationsData = require("../data/conversations.json");
    const answer = conversationsData.find(
      (conversation) => conversation.question === question
    )?.response;

    const updatedMessages = [
      ...(JSON.parse(localStorage.getItem(`conversation_${conversationId}`)) ||
        []),
      { text: question, sender: "User" },
      {
        text: answer || "Sorry, I don't have an answer for that.",
        sender: "AI",
        time: currentTime,
      },
    ];

    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, messages: updatedMessages }
          : conversation
      )
    );
    localStorage.setItem(
      `conversation_${conversationId}`,
      JSON.stringify(updatedMessages)
    );
  };

  return (
    <div>
      <SidebarMenu
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onStartNewConversation={handleStartNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
      />
      <ChatWindow
        conversationId={activeConversation}
        onAskQuestion={handleAskQuestionInActiveConversation}
        questions={questions}
      />
    </div>
  );
};

export default Assemble;
