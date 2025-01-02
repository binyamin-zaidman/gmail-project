import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BackgroundProvider } from './components/BackgroundContext.tsx';
import { VisibilityProvider } from './components/VisibilityContext.tsx';
import { UserProvider } from './components/UserContext.tsx';
import { VisibilityMEssageProvider } from './components/VisibilityMEssage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <BackgroundProvider>
        <VisibilityProvider>
        <VisibilityMEssageProvider>
          <App />
        </VisibilityMEssageProvider>
        </VisibilityProvider>
      </BackgroundProvider>
    </UserProvider>
  </StrictMode>,
);
