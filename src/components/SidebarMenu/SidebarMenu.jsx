import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import styles from "./SidebarMenu.module.css";
import AiIcon from "../../assets/ai-icon.png";
import newChatIcon from "../../assets/new-chat.svg";

const SidebarMenu = ({
  conversations,
  onSelectConversation,
  onStartNewConversation,
  onDeleteConversation,
  onRenameConversation,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [renameId, setRenameId] = useState(null);

  const handleStartNewConversation = () => {
    onStartNewConversation();
  };

  const handleSelectConversation = (conversation) => {
    onSelectConversation(conversation);
  };

  const handleDeleteConversation = (conversationId) => {
    onDeleteConversation(conversationId);
  };

  const handleRenameStart = (conversationId, title) => {
    setNewTitle(title);
    setRenameId(conversationId);
  };

  const handleRenameCancel = () => {
    setNewTitle("");
    setRenameId(null);
  };

  const handleRenameConfirm = (conversationId) => {
    onRenameConversation(conversationId, newTitle);
    setNewTitle("");
    setRenameId(null);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.title} onClick={handleStartNewConversation}>
        <img src={AiIcon} alt="AI Icon" className={styles.icon} />
        New Chat
        <img src={newChatIcon} alt="New Chat Icon" className={styles.icon2} />
      </div>

      <ul className={styles.conversationList}>
        {conversations.map((conversation) => (
          <li key={conversation.id} className={styles.conversationItem}>
            {renameId === conversation.id ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={() => handleRenameConfirm(conversation.id)}>
                  Confirm
                </button>
                <button onClick={handleRenameCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span onClick={() => handleSelectConversation(conversation)}>
                  {conversation.title}
                </span>
                <button onClick={() => handleRenameStart(conversation.id, conversation.title)}>
                  Rename
                </button>
              </>
            )}
            <button
              onClick={() => handleDeleteConversation(conversation.id)}
              className={styles.deleteButton}
            >
              <MdOutlineDeleteOutline size={15} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
