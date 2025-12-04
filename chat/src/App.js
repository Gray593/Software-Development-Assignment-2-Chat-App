import Message from './components/Message';
import './App.css';
import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([])
 
function handleClick() {
  const input = document.getElementsByClassName("userInput")[0].value;

  const newMessage = {
    username: "username",
    message: input,
    time: Date(),
  };

  setMessages([...messages, newMessage]); 

}
  return (
    <div className="App">
          <div className='header'>
            <h1 className='recName'>PlaceHolder</h1>
          </div>
          <div className='messages'>
            {messages.map(e => <Message username={e.username} message = {e.message} time = {e.time}/>)}
          </div>
          <div className='newMessage'>
            <input className='userInput'>
              
            </input>
            <button className='sendButton' onClick={handleClick}>
              S
            </button>
          </div>
    </div>
  );
}

export default App;
