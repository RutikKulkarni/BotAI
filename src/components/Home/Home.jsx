import React, { useState } from 'react';

const Home = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === 'what is the weather') {
      setResponse('The weather is sunny today!');
    } else if (query === 'what is my location') {
      setResponse('Your location is not available.');
    } else if (query === 'what is the temperature') {
      setResponse('The temperature is 72 degrees Fahrenheit.');
    } else if (query === 'how are you') {
      setResponse("I'm an AI, and I don''t have feelings, but I'm here to help you!");
    } else {
      setResponse("I'm sorry, I didn''t understand your question.");
    }
  };

  return (
    <div className="home">
      <h1>Bot Al</h1>
      <p>How Can I Help You Today?</p>
    </div>
  );
};

export default Home;