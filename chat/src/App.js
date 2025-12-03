import logo from './logo.svg';
import './App.css';

function App() {

  let messages = ["hello","hi","bye"]
  return (
    <div className="App">
          <div className='header'>
            <h1 className='recName'>PlaceHolder</h1>
          </div>
          <div className='messages'>
            {messages.map(e => <Message user={username} text = {e}/>)}
          </div>
          <div className='newMessage'>
            <input className='userInput'>
              
            </input>
            <button className='sendButton'>
              S
            </button>
          </div>
    </div>
  );
}

export default App;
