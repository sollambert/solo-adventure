//utils
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

//Components
import ChatInput from '../HomeComponents/ChatInput/ChatInput';
import ChatHistory from '../HomeComponents/ChatHistory/ChatHistory';
import Room from '../HomeComponents/Room/Room';
import NavBar from '../HomeComponents/NavBar/NavBar';
import Help from '../Help/Help';

//css
import './App.css';

function App() {

  const historyEndRef = useRef(null)

  const history = useSelector(store => store.history);
  const dispatch = useDispatch();
  const room = useSelector(store => store.room);

  useEffect(() => {
    getRoom();
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [history])

  const scrollToBottom = () => {
    historyEndRef.current?.scrollIntoView()
  }

  const getRoom = () => {
    axios.get('/room')
    .then((response) => {
      dispatch({type: "SET_ROOM", payload: response.data})
      console.log(history.length);
      dispatch({type: "ADD_HISTORY", payload: {id: history.length, message: response.data.description}})
    })
    .catch((err) => {
      console.error(err);
    })
  }

  const updateHistory = (message, response) => new Promise((resolve, reject) => {
    //console.log(response)
    dispatch({type: 'ADD_HISTORY',
    payload: {id: history.length, message: message}})
    dispatch({type: 'ADD_HISTORY',
    payload: {id: history.length + 1, message: response.data.result}})
    resolve();
  })

  const sendCommand = (message, cb) => {
    let playerInfo = {room};
    axios.post('/command', {message , playerInfo})
      .then((response) => {
        console.log(response);
        updateHistory(message, response)
        .then(() => {
          if (response.data.type == "GO") {
            getRoom();
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
    cb();
  }

  // console.log(history);
  return (
    <Router>
      <div className="display">
        <h1>Cloud Quest</h1>
        <div className="nav">
          <NavBar />
        </div>
        <Route path="/" exact>
          <div className="images">
            <Room />
          </div>
          <div className="chat">
            <ChatHistory messages={history} historyEndRef={historyEndRef} />
            <ChatInput send={sendCommand} />
          </div>
        </Route>
        <Route path="/help" exact>
          <Help/>
        </Route>
      </div>
    </Router>
  )
}

export default App;
