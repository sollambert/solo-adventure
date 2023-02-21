import ChatInput from '../WindowComponents/ChatInput/ChatInput';
import ChatHistory from '../WindowComponents/ChatHistory/ChatHistory';
import Room from '../WindowComponents/Room/Room';
import NavBar from '../WindowComponents/NavBar/NavBar';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from "react-router-dom";

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
    axios.post('/history', { message })
      .then((response) => {
        getHistory();
      })
      .catch((err) => {
        console.log(err);
      })
    cb();
  }

  return (
    <Router>
      <div className="display">
        <h1>Cloud Quest</h1>
        <div className="images">
          <Room />
        </div>
        <div className="chat">
          <ChatHistory messages={history} historyEndRef={historyEndRef} />
          <ChatInput value={chatBuffer} send={sendCommand} setValue={setChatBuffer} />
        </div>
        <div className="nav">
          <NavBar />
        </div>
      </div>
    </Router>
  )
}

export default App;
