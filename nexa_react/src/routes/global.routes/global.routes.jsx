import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoutes from '../admin.routes/admin.routes'
import DonorRoutes from '../donor.routes/donor.routes'
import InstitutionRoutes from '../institution.routes/institution.routes'
import TutorRoutes from '../tutor.routes/tutor.routes'
import StudentRoutes from '../student.routes/student.routes'
import LandingPage from '../../pages/global.pages/landing.pages/landing.page'
import RegisterPage from '../../pages/global.pages/register.pages/register.page'
import AboutUs from '../../pages/global.pages/landing.pages/aboutUs.page'
import ContactUs from '../../pages/global.pages/landing.pages/contactUs.page'
import DonationPage from '../../pages/global.pages/landing.pages/donate.page'
import LoginPage from '../../pages/global.pages/login.pages/login.page'
import TncPage from '../../pages/global.pages/tnc.pages/tnc.page'
import PrivacyPolicyPage from '../../pages/global.pages/tnc.pages/privacyPolicy.page'
import ProtectedRoute from '../../components/global.components/routeProtector.component'
import CoursePage from '../../pages/student.pages/course.page'

function GlobalRoutes() {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/about' element={<AboutUs />}></Route>
            <Route path='/contact' element={<ContactUs />}></Route>
            <Route path='/donate' element={<DonationPage />}></Route>
            <Route path='/tnc' element={<TncPage />}></Route>
            <Route path='/privacy' element={<PrivacyPolicyPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='register/*' element={<RegisterPage />}></Route>

            <Route>
                <Route path="admin/*" element={<AdminRoutes />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["donor"]} />}>
                <Route path="donor/*" element={<DonorRoutes />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["institution"]} />}>
                <Route path="institution/*" element={<InstitutionRoutes />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
                <Route path="student/*" element={<StudentRoutes />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["tutor"]} />}>
                <Route path="tutor/*" element={<TutorRoutes />} />
            </Route>

            <Route path='c/*' element={<CoursePage />} />
        </Routes>
    )
}

export default GlobalRoutes