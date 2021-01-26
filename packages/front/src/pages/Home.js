import React, { useState, useEffect } from 'react';
import apiRequest from '@exclusive-clubhouse/api-request';
import MessagesList from '../components/MessagesList';

function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const result = await apiRequest.get('http://localhost:3000/messages').json();
    setMessages(result);
  };

  return (
    <div>
      <MessagesList messages={messages} />
    </div>
  )
}

export default Home;
