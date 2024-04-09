// import React, { useState, useEffect } from "react";
// import ChatWindow from "./ChatWindow/ChatWindow";
// import SidebarMenu from "./SidebarMenu/SidebarMenu";
// import Home from "./Home/Home";

// const Assemble = () => {
//   const [activeConversation, setActiveConversation] = useState(null);
//   const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     const savedConversations =
//       JSON.parse(localStorage.getItem("savedConversations")) || [];
//     setConversations(savedConversations);

//     const savedActiveConversation = localStorage.getItem("activeConversation");
//     if (savedActiveConversation) {
//       setActiveConversation(parseInt(savedActiveConversation));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("savedConversations", JSON.stringify(conversations));
//   }, [conversations]);

//   const handleSelectConversation = (conversation) => {
//     setActiveConversation(conversation.id);
//     localStorage.setItem("activeConversation", conversation.id);
//   };

//   const handleStartNewConversation = () => {
//     const newConversationId = Date.now();
//     const newConversationTitle = `Conversation ${conversations.length + 1}`;
//     const newConversation = {
//       id: newConversationId,
//       title: newConversationTitle,
//       messages: [],
//     };
//     setConversations([...conversations, newConversation]);
//     setActiveConversation(newConversationId);
//     localStorage.setItem("activeConversation", newConversationId);
//   };

//   const handleDeleteConversation = (conversationId) => {
//     const updatedConversations = conversations.filter(
//       (conversation) => conversation.id !== conversationId
//     );
//     setConversations(updatedConversations);
//     localStorage.setItem(
//       "savedConversations",
//       JSON.stringify(updatedConversations)
//     );

//     if (activeConversation === conversationId) {
//       setActiveConversation(null);
//       localStorage.removeItem("activeConversation");
//     }
//   };

//   const handleRenameConversation = (conversationId, newTitle) => {
//     setConversations((prevConversations) =>
//       prevConversations.map((conversation) =>
//         conversation.id === conversationId
//           ? { ...conversation, title: newTitle }
//           : conversation
//       )
//     );
//   };

//   const handleAskQuestionInActiveConversation = (question) => {
//     if (activeConversation) {
//       handleAskQuestion(question, activeConversation);
//     } else {
//       const newConversationId = Date.now();
//       const newConversationTitle = `Conversation ${conversations.length + 1}`;
//       const newConversation = {
//         id: newConversationId,
//         title: newConversationTitle,
//         messages: [],
//       };
//       setConversations([...conversations, newConversation]);
//       setActiveConversation(newConversationId);
//       localStorage.setItem("activeConversation", newConversationId);
//       handleAskQuestion(question, newConversationId);
//     }
//   };

//   const handleAskQuestion = (question, conversationId) => {
//     const conversationsData = require("../data/conversations.json");
//     const answer = conversationsData.find(
//       (conversation) => conversation.question === question
//     )?.response;

//     const updatedMessages = [
//       ...(JSON.parse(localStorage.getItem(`conversation_${conversationId}`)) ||
//         []),
//       { text: question, sender: "User" },
//       {
//         text: answer || "Sorry, I don't have an answer for that.",
//         sender: "AI",
//       },
//     ];

//     setConversations((prevConversations) =>
//       prevConversations.map((conversation) =>
//         conversation.id === conversationId
//           ? { ...conversation, messages: updatedMessages }
//           : conversation
//       )
//     );
//     localStorage.setItem(
//       `conversation_${conversationId}`,
//       JSON.stringify(updatedMessages)
//     );
//   };

//   return (
//     <div>
//       <SidebarMenu
//         conversations={conversations}
//         onSelectConversation={handleSelectConversation}
//         onStartNewConversation={handleStartNewConversation}
//         onDeleteConversation={handleDeleteConversation}
//         onRenameConversation={handleRenameConversation}
//       />
//       <Home/>
//       <ChatWindow
//         conversationId={activeConversation}
//         onAskQuestion={handleAskQuestionInActiveConversation}
//       />
//     </div>
//   );
// };

// export default Assemble;


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

  const handleAskQuestion = (question, conversationId) => {
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
      {/* {!activeConversation && <Home />} */}
      <ChatWindow
        conversationId={activeConversation}
        onAskQuestion={handleAskQuestionInActiveConversation}
      />
    </div>
  );
};

export default Assemble;
