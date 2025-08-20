import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TutorPage from '../../pages/tutor.pages/tutor.page'

function TutorRoutes() {
    return (
        <Routes>
            <Route path='/' element={<TutorPage />} />
        </Routes>
    )
}

export default TutorRoutes