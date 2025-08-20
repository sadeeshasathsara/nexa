import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoutes from '../admin.routes/admin.routes'
import DonorRoutes from '../donor.routes/donor.routes'
import InstitutionRoutes from '../institution.routes/institution.routes'
import TutorRoutes from '../tutor.routes/tutor.routes'
import StudentRoutes from '../student.routes/student.routes'

function GlobalRoutes() {
    return (
        <Routes>
            <Route path='admin/*' element={<AdminRoutes />}></Route>
            <Route path='donor/*' element={<DonorRoutes />}></Route>
            <Route path='institution/*' element={<InstitutionRoutes />}></Route>
            <Route path='student/*' element={<StudentRoutes />}></Route>
            <Route path='tutor/*' element={<TutorRoutes />}></Route>
        </Routes>
    )
}

export default GlobalRoutes