import { GraduationCap } from 'lucide-react';
import React from 'react'
import RegistrationStepper from '../../global.components/register.components/registrationStepper.component';
import { registrationConfigs } from '../../../configs/registration.config';

export default function RegisterStudent() {
    return <RegistrationStepper config={registrationConfigs.student} />;
}