import { useState } from 'react'
import Page from './components/page'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='pageBody'>
        <h2>my watsapp</h2>
        <Page />
      </div>
    </>
  )
}

export default App
