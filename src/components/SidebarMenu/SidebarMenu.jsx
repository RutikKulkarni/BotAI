import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import styles from "./SidebarMenu.module.css";
import AiIcon from "../../assets/ai-icon.png";
import newChatIcon from "../../assets/new-chat.svg";

const SidebarMenu = ({
  conversations,
  onSelectConversation,
  onStartNewConversation,
  onDeleteConversation,
}) => {
  const handleStartNewConversation = () => {
    onStartNewConversation();
  };

  const handleSelectConversation = (conversation) => {
    onSelectConversation(conversation);
  };

  const handleDeleteConversation = (conversationId) => {
    onDeleteConversation(conversationId);
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
            <span onClick={() => handleSelectConversation(conversation)}>
              {conversation.title}
            </span>
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
