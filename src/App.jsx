import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import List from './components/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-white'>
      <List/>
    </div>
  )
}

export default App
