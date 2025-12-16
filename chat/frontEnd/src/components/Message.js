export default function Message ({username, message, time, currentUser }){
    const isMe = username === currentUser
    return(
        <div className={`messageBody ${isMe ? "me" : "other"}`}>
            <p className="messageContent">{message}</p>
            <p className="sender">{username}</p>
            <p className="timeStamp">{time}</p>
        </div>
    )
    
}

