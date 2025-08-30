import React from 'react'
import RegistrationStepper from '../../../components/global.components/register.components/registrationStepper.component';
import { registrationConfigs } from '../../../configs/registration.config';

export default function RegisterStudentPage() {
    return <RegistrationStepper config={registrationConfigs.student} />;
}