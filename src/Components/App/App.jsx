import Stats from '../WindowComponents/Stats/Stats'
import ChatInput from '../WindowComponents/ChatInput/ChatInput';
import ChatHistory from '../WindowComponents/ChatHistory/ChatHistory';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import axios from 'axios';

function App() {

  const [chatBuffer, setChatBuffer] = useState('');

  const [history, setHistory] = useState([]);
  const historyEndRef = useRef(null)

  useEffect(() => {
    getHistory();
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [history])

  const scrollToBottom = () => {
    // historyEndRef.current?.scrollIntoView({ behavior: "smooth"})
    historyEndRef.current?.scrollIntoView()
  }

  const getHistory = () => {
    // console.log('history getting');
    axios.get('/history')
      .then((response) => {
        setHistory(response.data);
        scrollToBottom();
      })
      .catch((err) => {
        console.error(err);
      })
  }


  const sendCommand = (message, cb) => {
    let split = message.split(' ');
    console.log(split);
    axios.post('/history', {message})
    .then((response) => {
      getHistory();
    })
    .catch((err) => {
      console.log(err);
    })
    cb();
  }

  return (
    <div>
      <Stats />
      <ChatHistory messages={history} historyEndRef={historyEndRef}/>
      <ChatInput value={chatBuffer} send={sendCommand} setValue={setChatBuffer} />
    </div>
  )
}

export default App;
