import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BackgroundProvider } from "./components/BackgroundContext.tsx";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BackgroundProvider>
            <App />
        </BackgroundProvider>
  </StrictMode>,
)
