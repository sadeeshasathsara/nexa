import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import NotificationProvider from './components/global.components/notification.components/notificationProvider.component.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotificationProvider>
  </StrictMode>,
)
