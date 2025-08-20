import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InstitutionPage from '../../pages/institution.pages/institution.page'

function InstitutionRoutes() {
    return (
        <Routes>
            <Route path='/' element={<InstitutionPage />} />
        </Routes>
    )
}

export default InstitutionRoutes