import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'nprogress/nprogress.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from './context/SocketContext.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </SocketContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
