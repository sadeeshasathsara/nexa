import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import NotificationProvider from './components/global.components/notification.components/notificationProvider.component.jsx'
import { GlobalLoadingProvider } from './components/global.components/loading.components/loading.component.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <GlobalLoadingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalLoadingProvider>
    </NotificationProvider>
  </StrictMode>,
)
