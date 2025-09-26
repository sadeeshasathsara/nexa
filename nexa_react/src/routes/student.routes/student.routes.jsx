import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/student.pages/home.page'

function StudentRoutes() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
        </Routes>
    )
}

export default StudentRoutes