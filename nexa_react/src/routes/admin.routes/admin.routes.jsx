import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPage from '../../pages/admin.pages/admin.page'

function AdminRoutes() {
    return (
        <Routes>
            <Route path='/' element={<AdminPage />} />
        </Routes>
    )
}

export default AdminRoutes