import { useEffect, useState } from 'react'
import Message from './components/Message'
import io from "socket.io-client"

const socket = io("http://localhost:3001") //creates a web socket connection to the server

export default function App() { //main function of the program that is rendered inside index js
  const [messages, setMessages] = useState([]) //lines 8, 9 and 10 all use the react useState hook this is used as a form of dynamic variable, in this instance the three variable being created are messages, username and joined
  const [username, setUsername] = useState("")
  const [joined, setJoined] = useState(false)

  function joinChat() {// the join chat function ensures the users input name isnt blank or just spaces
    if (username.trim() !== "") {
      setJoined(true)//if the username is valid set joined to true
    }
  }

  function handleClick() { // the handle click function sends the users message to the server
    const inputBox = document.getElementsByClassName("userInput")[0] //assigns the input box variable to the input box on the webpage
    const input = inputBox.value //sets the input to the value within the inputbox

    if (input.trim() === "") return // if the input is blank or just spaces exit out the function

    const newMessage = { //creates the newMessage object
      username: username, //sets the username,message and time as individual pairs
      message: input,
      time: new Date().toLocaleTimeString()
    }

    socket.emit("chatMessage", newMessage) //sends the message to the server
    inputBox.value = "" //resets the message input to nothing
  }

  useEffect(() => { // this use effects live updates for users chat messages 
    socket.on("chatMessage", (msg) => { // receives chat message
      setMessages(prev => [...prev, msg])//adds the message to the messages array rerendering the page
    })

    return () => socket.off()// clean up function that removes event listeners to prevent duplicate listeners
  }, [])

  if (!joined) { //if the user has not joined (the joined variable is false) render the following
  return (
      <div className="welcomeScreen">
        <p className="welcomeText">
          Hi
          <span className="nameWrapper">
            <span className="userName">
              {username}
            </span>
            <span className="cursor">|</span>
          </span>
          ,
          <div>Welcome to </div> 
          <div>the mobile </div>
          <div>group chat </div> 
          <div>web app</div>
        </p>

        <input
          className="welcomeInput"
          placeholder="Input Your Name Here"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button className="startButton" onClick={joinChat}>
          Get Started
        </button>
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
          /> // renders each message in the message array as a separate message component 
        )} 
      </div>

      <div className='newMessage'>
        <input className='userInput' placeholder="Input Your Message Here"/>
        <button className='sendButton' onClick={handleClick}> 
          Send
        </button>
      </div>
    </div>
  )
}

