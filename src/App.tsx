import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { ServerResponse } from '../../api/src';

function App() {
  const request = Math.random().toString().replace('.', '').slice(1, 6);
  const initial: ServerResponse = {
    test: request,
    response: 'waiting',
  };
  const [response, setResponse] = useState<ServerResponse>(initial);

  useEffect(() => {
    const location = window.location.href.slice(0, -1);
    fetch(`${location}:4000/${request}`)
      .then((data) => {
        return data.text();
      })
      .then((body) => {
        const bodyJson: ServerResponse = JSON.parse(body);
        setResponse(bodyJson);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <span>{response.test}</span>
        <span>{response.response}</span>
      </header>
    </div>
  );
}

export default App;
