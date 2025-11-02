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
})

httpServer.listen(5000, () => {
    console.log("server is running on port 5000...")
})