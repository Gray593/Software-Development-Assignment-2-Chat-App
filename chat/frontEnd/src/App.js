import { useEffect, useState } from 'react'
import Message from './components/Message'
import io from "socket.io-client"

const socket = io("http://localhost:3001")

export default function App() {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState("")
  const [joined, setJoined] = useState(false)

  function joinChat() {
    if (username.trim() !== "") {
      setJoined(true)
    }
  }

  function handleClick() {
    const inputBox = document.getElementsByClassName("userInput")[0]
    const input = inputBox.value

    if (input.trim() === "") return

    const newMessage = {
      username: username,
      message: input,
      time: new Date().toLocaleTimeString()
    }

    socket.emit("chatMessage", newMessage)
    inputBox.value = ""
  }

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages(prev => [...prev, msg])
    })

    return () => socket.off()
  }, [])

  if (!joined) {
    return (
      <div className="App joinScreen">
        <h2>Enter Name</h2>
        <input 
          placeholder="Username"
          className="userInput"
          onChange={(e)=> setUsername(e.target.value)}
        />
        <button onClick={joinChat} className="sendButton">Join</button>
      </div>
    )
  }

  return (
    <div className="App">
      <div className='header'>
        <h1 className='recName'>Chat Room</h1>
      </div>

      <div className='messages'>
        {messages.map((e,i) => 
          <Message 
            key={i}
            username={e.username} 
            message={e.message} 
            time={e.time} 
            currentUser = {username}
          />
        )}
      </div>

      <div className='newMessage'>
        <input className='userInput'/>
        <button className='sendButton' onClick={handleClick}>
          S
        </button>
      </div>
    </div>
  )
}

