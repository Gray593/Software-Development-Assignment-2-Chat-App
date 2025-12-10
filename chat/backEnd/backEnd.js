import express from "express"
import http from "http"
import {Server} from "socket.io"

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: { origin: "*" }  
})

let users = 0

io.on("connection", (socket) => {
    users++
    console.log("A user connected (" + users + " online)")

    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg)
    });

    socket.on("disconnect", () => {
        users--
        console.log("User disconnected (" + users + " online)")
    });
});

server.listen(3001, () => {
    console.log("Server running on port 3001")
});