import React from 'react';
import styles from './SidebarMenu.module.css';

const SidebarMenu = ({ conversations, onSelectConversation }) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Chat History</h2>
      <ul className={styles.conversationList}>
        {conversations.map((conversation) => (
          <li key={conversation.id} className={styles.conversationItem} onClick={() => onSelectConversation(conversation)}>
            {conversation.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;