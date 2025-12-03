import Message from './components/Message';
import './App.css';

function App() {

  let messages = [{username : "A",message : "hello",},{username : "A",message : "hello",},{username : "A",message : "hello",}]
  return (
    <div className="App">
          <div className='header'>
            <h1 className='recName'>PlaceHolder</h1>
          </div>
          <div className='messages'>
            {messages.map(e => <Message username={e.username} message = {e.message} time = {Date()}/>)}
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
