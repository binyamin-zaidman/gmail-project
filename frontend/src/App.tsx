import Page from './components/AppPage'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messege from './components/presentsMessages'
import Login from './components/login';
import SignUp from './components/signUp';
import ChatConversations from './components/chatConversations';
import AppPage from './components/AppPage';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={<AppPage />} />
        < Route path='/messege/:id' element={<Messege />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
