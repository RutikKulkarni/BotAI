import React, { useState } from 'react';
import { VscSend } from 'react-icons/vsc';
import styles from './QuestionAskField.module.css';

const QuestionAskField = ({ onAskQuestion }) => {
  const [question, setQuestion] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAskQuestion = () => {
    if (question.trim() !== '') {
      onAskQuestion(question);
      setQuestion('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAskQuestion();
    }
  };

  return (
    <div className={styles['question-ask-field']}>
      <input
        type="text"
        placeholder="Type your question here..."
        value={question}
        onChange={handleQuestionChange}
        onKeyDown={handleKeyDown}
        className={styles['input-field']}
      />
      <VscSend className={styles['send-icon']} onClick={handleAskQuestion} color='black'/>
    </div>
  );
};

export default QuestionAskField;
