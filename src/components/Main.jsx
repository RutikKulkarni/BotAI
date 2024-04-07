import React from "react";
import ChatWindow from "./ChatWindow/ChatWindow";
import SidebarMenu from "./SidebarMenu/SidebarMenu"; 
// import styles from "./Main.module.css"; 

const Main = () => {
  const conversations = [
    { id: 1, title: "Conversation 1" },
    { id: 2, title: "Conversation 2" },
    { id: 3, title: "Conversation 3" }
  ];

  const handleSelectConversation = (conversation) => {
    console.log("Selected conversation:", conversation);
  };

  return (
    // <div className={styles.container}>
    <div>
      {/* <SidebarMenu conversations={conversations} onSelectConversation={handleSelectConversation} /> */}
      <ChatWindow />
    </div>
  );
};

export default Main;
