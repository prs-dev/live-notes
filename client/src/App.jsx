import { useEffect } from 'react'
import {io} from 'socket.io-client'

const App = () => {
  useEffect(() => {
    const socket = io('http://localhost:5000')
    socket.on('connect', () => {
      console.log("socket connected:", socket.id)
    })
    return () => socket.disconnect()
  }, [])
  return (
    <div>
      <h1>Live Notes</h1>
    </div>
  )
}

export default App