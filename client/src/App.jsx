import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

const App = () => {
  const [text, setText] = useState("")
  const [room, setRoom] = useState('')
  const [id, setId] = useState(null)
  const [users, setUsers] = useState(null)
  const socket = useRef(null)
  useEffect(() => {
    socket.current = io('http://localhost:5000')
    socket.current.on('connect', () => {
      console.log("socket connected:", socket.current.id)
    })
    socket.current.on('note:update', note => setText(note))
    socket.current.on('room:joined', id => setId(id))
    socket.current.on("room:users", ids => setUsers(ids))
    return () => socket.current.disconnect()
  }, [])

  const handleChange = (e) => {
    setText(e.target.value)
    socket.current.emit('note:update', { note: e.target.value, room })
  }

  const handleRoom = (e) => {
    e.preventDefault()
    socket.current.emit("room:join", room)
  }

  useEffect(() => {
    socket.current.emit("room:users", room)
  }, [id])

  // const allUsers = () => {
  //   if(id) {
  //     socket.current.emit("room:users", room)
  //     console.log("i am here")
  //   }
  // }

  console.log(text, room, id)
  console.log(users)

  return (
    <div>
      <h1>Live Notes</h1>
      <div>
        <textarea rows={10} cols={30} value={text} onChange={handleChange} />
      </div>
      <div>
        <h2>Room Joining</h2>
        <input type="text" name="" id="" value={room} onChange={e => setRoom(e.target.value)} />
        <button onClick={handleRoom}>Join Room</button>
      </div>
      {id && <div>
        <div>
          <p>{id} has joined the room</p>
        </div>
        <div>
          <h2>Room:</h2> {room}
        </div>
        <div>
          <h2>All Users</h2>
          {/* <button onClick={allUsers}>List All</button> */}
          {users && users.map(user => <p>{user}</p>)}
        </div>
      </div>
      }
    </div>
  )
}

export default App