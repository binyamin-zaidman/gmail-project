import Page from './components/AppPage'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messege from './components/presentsMessages'
import Login from './components/login';
import SignUp from './components/signUp';
import ChatConversations from './components/chatConversations';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={<SignUp />} />
        < Route path='/messege/:id' element={<Messege />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
