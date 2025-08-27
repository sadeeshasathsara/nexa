/**
 * registrationConfigs
 * -------------------
 * This object defines the registration flow for different user types (Student, Tutor, Institution, Donor, etc.).
 *
 * STRUCTURE:
 *   registrationConfigs = {
 *     roleName: {
 *       name: string              → Display name of the registration flow
 *       color: string             → Tailwind gradient classes for UI theming
 *       icon: React.Component     → Icon for the registration header
 *       benefits: string[]        → List of benefits shown to motivate signups
 *
 *       steps: Array<{            → Ordered steps in the registration wizard
 *         component: React.Component
 *         icon: React.Component
 *         title: string
 *         slogan: string
 *       }>
 *
 *       tips: {                   → Contextual tips for each step
 *         [stepIndex: number]: Array<{
 *           type: "info" | "success" | "warning" | "tip"
 *           icon: React.Component
 *           title: string
 *           description: string
 *         }>
 *       }
 *     }
 *   }
 *
 * USAGE:
 *   const config = registrationConfigs["student"];
 *   const StepComponent = config.steps[currentStep].component;
 *   <StepComponent />  // Renders correct step
 *
 * ADDING A NEW ROLE:
 *   - Copy the "student" object as a template
 *   - Update `name`, `color`, `icon`, `benefits`
 *   - Add `steps` with appropriate step components
 *   - Add `tips` indexed by step number
 */

import { User, Mail, FileText, GraduationCap, BookOpen, Shield, CheckCircle, Lightbulb, Clock, AlertCircle, Star } from "lucide-react";
import AccountStep from "../components/global.components/register.components/steps.components/accountStep.component";
import OtpStep from "../components/global.components/register.components/steps.components/otpStep.component";
import TncStep from "../components/global.components/register.components/steps.components/tncStep.component";

export const registrationConfigs = {
    student: {
        name: "Student Registration",
        color: "from-blue-500 to-indigo-600",
        icon: GraduationCap,
        benefits: [
            "Access to exclusive student resources",
            "Free course materials and templates",
            "24/7 academic support community",
            "Career guidance and mentorship",
            "Scholarship opportunities"
        ],
        steps: [
            { component: AccountStep, icon: User, title: "Personal", slogan: "Let's start with your details" },
            { component: OtpStep, icon: Mail, title: "Verify", slogan: "Verify your email address" },
            { component: TncStep, icon: FileText, title: "Terms", slogan: "Accept our terms to continue" },
        ],
        payload: {
            role: 'student',
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            otpVerified: false,
            tncAccepted: false
        },
        tips: {
            0: [ // Account Step Tips
                {
                    type: "info",
                    icon: Shield,
                    title: "Secure Password",
                    description: "Use at least 8 characters with a mix of letters, numbers, and symbols for maximum security."
                },
                {
                    type: "success",
                    icon: CheckCircle,
                    title: "Valid Email Required",
                    description: "Make sure to use an active email address as we'll send important updates and verification codes."
                },
                {
                    type: "tip",
                    icon: Lightbulb,
                    title: "Pro Tip",
                    description: "Use your institutional email if available - it may unlock additional student benefits."
                }
            ],
            1: [ // OTP Step Tips
                {
                    type: "info",
                    icon: Clock,
                    title: "Check Your Inbox",
                    description: "The verification code should arrive within 2-3 minutes. Don't forget to check your spam folder."
                },
                {
                    type: "warning",
                    icon: AlertCircle,
                    title: "Code Expires Soon",
                    description: "Your verification code is valid for 10 minutes. Request a new one if it expires."
                },
                {
                    type: "tip",
                    icon: Mail,
                    title: "Didn't receive it?",
                    description: "Check your spam folder or click 'Resend Code' to get a new verification email."
                }
            ],
            2: [ // Terms Step Tips
                {
                    type: "info",
                    icon: Shield,
                    title: "Your Privacy Matters",
                    description: "We never share your personal information with third parties without your consent."
                },
                {
                    type: "success",
                    icon: CheckCircle,
                    title: "Almost Done!",
                    description: "You're just one step away from accessing all our student resources and community."
                },
                {
                    type: "tip",
                    icon: Star,
                    title: "Optional Newsletter",
                    description: "Stay updated with the latest courses, events, and opportunities by subscribing to our newsletter."
                }
            ]
        }
    }
};