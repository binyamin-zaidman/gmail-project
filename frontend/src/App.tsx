import Page from './components/page'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messege from './components/displaysMessages'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={<Page />} />
        < Route path='/messege/:id' element={<Messege />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
