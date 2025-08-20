import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DonorPage from '../../pages/donor.pages/donor.page'

function DonorRoutes() {
    return (
        <Routes>
            <Route path='/' element={<DonorPage />} />
        </Routes>
    )
}

export default DonorRoutes