import Stats from '../WindowComponents/Stats/Stats'
import ChatInput from '../WindowComponents/ChatInput/ChatInput';
import './App.css';
import {useState, useEffect} from 'react';
import React from 'react';
import axios from 'axios';

function App() {

  const [chatBuffer, setChatBuffer] = useState('');

  const [history, setHistory] = useState([]);

  const getHistory = () => {
    console.log('history getting');
    axios.get('/history')
    .then ((response) => {
      setHistory(response.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    getHistory();
  }, [])

  return (
      <div>
        <Stats />
        <ChatInput value={chatBuffer} setValue={setChatBuffer}/>
      </div>
    )
}

export default App;
