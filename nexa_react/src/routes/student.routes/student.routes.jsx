import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentPage from '../../pages/student.pages/student.page'

function StudentRoutes() {
    return (
        <Routes>
            <Route path='/' element={<StudentPage />} />
        </Routes>
    )
}

export default StudentRoutes