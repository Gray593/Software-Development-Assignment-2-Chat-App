import express from "express"
import http from "http"
import {Server} from "socket.io"

const app = express() //creates an express instance
const server = http.createServer(app) //wraps the express instance in a http server to allow socket to connect

const io = new Server(server, { //creates the server
    cors: { origin: "*" }  //allows the react frontend to connect
})

let users = 0 //this variable tracks the number of connected users

io.on("connection", (socket) => {//when a user connects
    users++ //add 1 to the user count
    console.log("A user connected") //ouputs when a user connects used in testing

    socket.on("chatMessage", (msg) => { //listens for messages 
        io.emit("chatMessage", msg) //broadcasts any message that is sent
    })

    socket.on("disconnect", () => { // when a user disconnects
        users-- // subtratcs one from users
        console.log("A user disconnected") // console logs a user as disconnected useful when testing
    })
});

server.listen(3001, () => { // starts the server on port 3001
    console.log("Server running on port 3001") //console logs that the server is online
});