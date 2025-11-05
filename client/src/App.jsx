import { useEffect, useState, useRef } from 'react'
import {io} from 'socket.io-client'

const App = () => {
  const [text, setText] = useState("")
  const socket = useRef(null)
  useEffect(() => {
    socket.current = io('http://localhost:5000')
    socket.current.on('connect', () => {
      console.log("socket connected:", socket.current.id)
    })
    socket.current.on('note:update', note => setText(note))
    return () => socket.current.disconnect()
  }, [])

  const handleChange = (e) => {
    setText(e.target.value)
    socket.current.emit('note:update', e.target.value)
  }

  return (
    <div>
      <h1>Live Notes</h1>
      <div>
        <textarea rows={10} cols={30} value={text} onChange={handleChange}/>
      </div>
    </div>
  )
}

export default App