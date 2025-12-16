export default function Message ({username, message, time, currentUser }){ //the message, component takes in the username message, time and current user variables as props
    const isMe = username === currentUser // determines if the message sender is the user or another user
    return( //the below line determines the classname based on who the sender of the message is this is used for css styling
        <div className={`messageBody ${isMe ? "me" : "other" }`}> 
            <p className="messageContent">{message}</p>
            <p className={`sender ${isMe ? "meS" : "otherS"}` }>{username}</p>
            <p className={`timeStamp ${isMe ? "meT" : "otherT"}` }>{time}</p>
        </div>
    )
}

