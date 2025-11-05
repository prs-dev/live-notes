const express = require("express")
const {createServer} = require('http')
const {Server} = require("socket.io")
// const cors = require('cors')

const app = express()

// app.use(cors())

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on("connection", socket => {
    console.log('a user connected', socket.id)
    socket.on('disconnect', () => {
        console.log("user disconnected")
    })
    socket.on('note:update', data => {
        console.log("note updated", data.note)
        socket.to(data.room).emit('note:update', data.note)
    })
    socket.on('room:join', room => {
        socket.join(room)
        console.log("user joined", room)
        socket.emit("room:joined", socket.id)
        // console.log(socket.rooms)
    })
})

httpServer.listen(5000, () => {
    console.log("server is running on port 5000...")
})