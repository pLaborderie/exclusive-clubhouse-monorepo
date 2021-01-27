import React, { useState, useEffect } from 'react';
import apiRequest from 'api-request';
import MessagesList from '../components/MessagesList';

function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const result = await apiRequest.get('messages').json();
    setMessages(result);
  };

  return (
    <div>
      <MessagesList messages={messages} />
    </div>
  )
}

export default Home;
