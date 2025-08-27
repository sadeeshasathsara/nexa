import React from 'react'
import RegistrationOnboarding from '../../../components/global.components/register.components/userOnboarding.component'
import Navbar from '../../../components/global.components/navbar.component'
import Footer from '../../../components/global.components/footer.component'

function RegisterPage() {
    return (
        <div className=''>
            <Navbar />
            <div className='w-full flex items-center justify-center'>
                <RegistrationOnboarding />
            </div>
            <Footer />
        </div>
    )
}

export default RegisterPage