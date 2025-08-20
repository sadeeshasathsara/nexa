import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import GlobalRoutes from './routes/global.routes/global.routes'
import RedirectToDefaultRoute from './tools/global.tools.js/defaultRoot.tool'

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<RedirectToDefaultRoute />} />
        <Route path='/v1/*' element={<GlobalRoutes />} />
      </Routes>
    </>
  )
}

export default App
