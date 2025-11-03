import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

const App = () => {
  const [text, setText] = useState("")
  useEffect(() => {
    const socket = io('http://localhost:5000')
    socket.on('connect', () => {
      console.log("socket connected:", socket.id)
    })
    return () => socket.disconnect()
  }, [])
  useEffect(() => {
    const socket = io('http://localhost:5000')
    socket.emit('note:update', text)
    socket.on('note:update', note => setText(note))
    return () => socket.disconnect()
  }, [text])
  return (
    <div>
      <h1>Live Notes</h1>
      <div>
        <textarea rows={10} cols={30} value={text} onChange={e => setText(e.target.value)}/>
      </div>
    </div>
  )
}

export default App