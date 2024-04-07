import React from 'react';
import ChatWindow from './ChatWindow/ChatWindow';
// import ConversationHistory from './ConversationHistory';
// import ThemeToggle from './ThemeToggle';

const Main = () => {
  return (
    <div className="main">
      {/* <ConversationHistory /> */}
      <ChatWindow />
      {/* <ThemeToggle /> */}
    </div>
  );
};

export default Main;
