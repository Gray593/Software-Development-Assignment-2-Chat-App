function Message ({username, message, time }){

    return(
        <div className="messageBody">
            <p className="messageContent">{message}</p>
            <p className="sender">{username}</p>
            <p className="timeStamp">{time}</p>
        </div>
    )
    
}

export default Message