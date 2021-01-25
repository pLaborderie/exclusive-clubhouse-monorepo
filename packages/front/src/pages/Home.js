import React, { useState, useEffect } from 'react'
import ky from 'ky';
import MessagesList from '../components/MessagesList';

function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const result = await ky.get('http://localhost:3000/messages').json();
    setMessages(result);
  };

  return (
    <div>
      <MessagesList messages={messages} />
    </div>
  )
}

export default Home;
