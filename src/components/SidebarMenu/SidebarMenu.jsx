import React, { useState } from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
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

  const handleRenameConfirm = (conversationId) => {
    if (newTitle.trim() !== "") {
      onRenameConversation(conversationId, newTitle);
      setNewTitle("");
      setRenameId(null);
    }
  };

  const handleRenameCancel = () => {
    setNewTitle("");
    setRenameId(null);
  };

  const handleBlur = (conversationId) => {
    if (newTitle.trim() === "") {
      handleRenameCancel();
    } else {
      handleRenameConfirm(conversationId);
    }
  };

  const handleKeyDown = (e, conversationId) => {
    if (e.key === "Enter") {
      handleRenameConfirm(conversationId);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.titleContainer}>
        <div className={styles.title} onClick={handleStartNewConversation}>
          <img src={AiIcon} alt="AI Icon" className={styles.icon} />
          New Chat
          <img src={newChatIcon} alt="New Chat Icon" className={styles.icon2} />
        </div>
      </div>

      <ul className={styles.conversationList} style={{ height: "calc(100vh - 100px)" }}>
        {conversations.map((conversation) => (
          <li key={conversation.id} className={styles.conversationItem}>
            <div>
              {renameId === conversation.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => handleBlur(conversation.id)}
                  onKeyDown={(e) => handleKeyDown(e, conversation.id)}
                  autoFocus
                  required
                />
              ) : (
                <>
                  <span
                    onClick={() => handleSelectConversation(conversation)}
                    className={styles.conversationName}
                  >
                    {conversation.title}
                  </span>
                </>
              )}
            </div>
            <div>
              <MdOutlineModeEdit
                onClick={() =>
                  handleRenameStart(conversation.id, conversation.title)
                }
                className={styles.renameButton}
                size={18}
              />
              <MdOutlineDeleteOutline
                onClick={() => handleDeleteConversation(conversation.id)}
                className={styles.deleteButton}
                size={18}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
