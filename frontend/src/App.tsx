import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import SignUp from './components/signUp';
import AppPage from './components/AppPage';
import ShowAllMessages from './components/showMessages';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={<Login />} />
        < Route path='/signUp' element={<SignUp />} />
        < Route path='/app/:userId' element={<AppPage />} />
        < Route path='/app/:userId/chat/:chatId' element={<AppPage />} />
        {/* < Route path='/message/:id' element={<ShowAllMessages />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
