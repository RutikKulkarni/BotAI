import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow/ChatWindow";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

const Main = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const savedConversations =
      JSON.parse(localStorage.getItem("savedConversations")) || [];
    setConversations(savedConversations);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedConversations", JSON.stringify(conversations));
  }, [conversations]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation.id);
  };

  const handleStartNewConversation = () => {
    const newConversationId = Date.now();
    const newConversationTitle = `Conversation ${conversations.length + 1}`;
    const newConversation = {
      id: newConversationId,
      title: newConversationTitle,
    };
    setConversations([...conversations, newConversation]);
    setActiveConversation(newConversationId);
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
    }
  };

  const handleRenameConversation = (conversationId, newTitle) => {
    setConversations(prevConversations =>
      prevConversations.map(conversation =>
        conversation.id === conversationId ? { ...conversation, title: newTitle } : conversation
      )
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
      {activeConversation && <ChatWindow conversationId={activeConversation} />}
    </div>
  );
};

export default Main;
