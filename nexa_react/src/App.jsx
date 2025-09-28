import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import GlobalRoutes from './routes/global.routes/global.routes'
import RedirectToDefaultRoute from './tools/global.tools.js/defaultRoot.tool'
import DonorDashboard from './components/donor.components/dashboard.components/donorDashboard.component.jsx'

function App() {

  return (
    <>
      <Routes>

        <Route path='/v1/*' element={<GlobalRoutes />} />
        <Route path="/*" element={<RedirectToDefaultRoute />} />

      </Routes>
    </>
  )
}

export default App
