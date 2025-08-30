import React from 'react'
import RegistrationStepper from '../../../components/global.components/register.components/registrationStepper.component'
import { registrationConfigs } from '../../../configs/registration.config'

function RegisterDonorPage() {
    return (
        <RegistrationStepper config={registrationConfigs.donor} />
    )
}

export default RegisterDonorPage