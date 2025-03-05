import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AuthProvider from './context/AuthProvider.tsx';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster richColors />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
