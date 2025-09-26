/**
 * TutorRegistrationPage Component
 * -------------------------------
 * Main page component for tutor registration using the RegistrationStepper
 * with tutor-specific configuration
 */

import React from "react";
import RegistrationStepper from "../../global.components/register.components/registrationStepper.component";
import { registrationConfigs } from "../../../configs/registration.config";

export default function RegisterTutor() {
  return <RegistrationStepper config={registrationConfigs.tutor} />;
}
