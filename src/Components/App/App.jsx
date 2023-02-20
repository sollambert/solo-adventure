import Stats from '../WindowComponents/Stats/Stats'
import ChatInput from '../WindowComponents/ChatInput/ChatInput';
import './App.css';
import {useState} from 'react';
import React from 'react';

function App() {

  const [chatBuffer, setChatBuffer] = useState('');

  return (
      <div>
        <Stats />
        <ChatInput value={chatBuffer} setValue={setChatBuffer}/>
      </div>
    )
}

export default App;
