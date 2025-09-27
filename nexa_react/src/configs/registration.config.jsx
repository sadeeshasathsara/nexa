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

import {
  User,
  Mail,
  FileText,
  GraduationCap,
  BookOpen,
  Shield,
  CheckCircle,
  Lightbulb,
  Clock,
  AlertCircle,
  Star,
  Heart,
  Phone,
  Calendar,
  School,
  Award,
  MessageSquare,
  Eye,
} from "lucide-react";
import AccountStep from "../components/global.components/register.components/steps.components/accountStep.component";
import OtpStep from "../components/global.components/register.components/steps.components/otpStep.component";
import TncStep from "../components/global.components/register.components/steps.components/tncStep.component";
import GeneralInfoStep from "../components/global.components/register.components/steps.components/tutor.step/GeneralInfoStep";
import LegalSafetyStep from "../components/global.components/register.components/steps.components/tutor.step/LegalSafetyStep";
import ExperienceSkillsStep from "../components/global.components/register.components/steps.components/tutor.step/ExperienceSkillsStep";
import MotivationStep from "../components/global.components/register.components/steps.components/tutor.step/MotivationStep";
import ReviewStep from "../components/global.components/register.components/steps.components/tutor.step/ReviewStep";

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
      "Scholarship opportunities",
    ],
    steps: [
      {
        component: AccountStep,
        icon: User,
        title: "Personal",
        slogan: "Let's start with your details",
      },
      {
        component: OtpStep,
        icon: Mail,
        title: "Verify",
        slogan: "Verify your email address",
      },
      {
        component: TncStep,
        icon: FileText,
        title: "Terms",
        slogan: "Accept our terms to continue",
      },
    ],
    payload: {
      role: "student",
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      otpVerified: false,
      tncAccepted: false,
    },
    tips: {
      0: [
        // Account Step Tips
        {
          type: "info",
          icon: Shield,
          title: "Secure Password",
          description:
            "Use at least 8 characters with a mix of letters, numbers, and symbols for maximum security.",
        },
        {
          type: "success",
          icon: CheckCircle,
          title: "Valid Email Required",
          description:
            "Make sure to use an active email address as we'll send important updates and verification codes.",
        },
        {
          type: "tip",
          icon: Lightbulb,
          title: "Pro Tip",
          description:
            "Use your institutional email if available - it may unlock additional student benefits.",
        },
      ],
      1: [
        // OTP Step Tips
        {
          type: "info",
          icon: Clock,
          title: "Check Your Inbox",
          description:
            "The verification code should arrive within 2-3 minutes. Don't forget to check your spam folder.",
        },
        {
          type: "warning",
          icon: AlertCircle,
          title: "Code Expires Soon",
          description:
            "Your verification code is valid for 10 minutes. Request a new one if it expires.",
        },
        {
          type: "tip",
          icon: Mail,
          title: "Didn't receive it?",
          description:
            "Check your spam folder or click 'Resend Code' to get a new verification email.",
        },
      ],
      2: [
        // Terms Step Tips
        {
          type: "info",
          icon: Shield,
          title: "Your Privacy Matters",
          description:
            "We never share your personal information with third parties without your consent.",
        },
        {
          type: "success",
          icon: CheckCircle,
          title: "Almost Done!",
          description:
            "You're just one step away from accessing all our student resources and community.",
        },
        {
          type: "tip",
          icon: Star,
          title: "Optional Newsletter",
          description:
            "Stay updated with the latest courses, events, and opportunities by subscribing to our newsletter.",
        },
      ],
    },
  },
  donor: {
    name: "Donor Registration",
    color: "from-rose-500 via-rose-600 to-pink-700",
    icon: Heart,
    benefits: [
      "Access to exclusive donor resources",
      "Free donation tracking tools",
      "24/7 donor support community",
      "Personalized giving recommendations",
      "Scholarship opportunities",
    ],
    steps: [
      {
        component: AccountStep,
        icon: User,
        title: "Personal",
        slogan: "Let's start with your details",
      },
      {
        component: OtpStep,
        icon: Mail,
        title: "Verify",
        slogan: "Verify your email address",
      },
      {
        component: TncStep,
        icon: FileText,
        title: "Terms",
        slogan: "Accept our terms to continue",
      },
    ],
    payload: {
      role: "donor",
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      otpVerified: false,
      tncAccepted: false,
    },
    tips: {
      0: [
        // Account Step Tips
        {
          type: "info",
          icon: Shield,
          title: "Secure Password",
          description:
            "Use at least 8 characters with a mix of letters, numbers, and symbols for maximum security.",
        },
        {
          type: "success",
          icon: CheckCircle,
          title: "Valid Email Required",
          description:
            "Make sure to use an active email address as we'll send important updates and verification codes.",
        },
        {
          type: "tip",
          icon: Lightbulb,
          title: "Pro Tip",
          description:
            "Use your institutional email if available - it may unlock additional student benefits.",
        },
      ],
      1: [
        // OTP Step Tips
        {
          type: "info",
          icon: Clock,
          title: "Check Your Inbox",
          description:
            "The verification code should arrive within 2-3 minutes. Don't forget to check your spam folder.",
        },
        {
          type: "warning",
          icon: AlertCircle,
          title: "Code Expires Soon",
          description:
            "Your verification code is valid for 10 minutes. Request a new one if it expires.",
        },
        {
          type: "tip",
          icon: Mail,
          title: "Didn't receive it?",
          description:
            "Check your spam folder or click 'Resend Code' to get a new verification email.",
        },
      ],
      2: [
        // Terms Step Tips
        {
          type: "info",
          icon: Shield,
          title: "Your Privacy Matters",
          description:
            "We never share your personal information with third parties without your consent.",
        },
        {
          type: "success",
          icon: CheckCircle,
          title: "Almost Done!",
          description:
            "You're just one step away from accessing all our student resources and community.",
        },
        {
          type: "tip",
          icon: Star,
          title: "Optional Newsletter",
          description:
            "Stay updated with the latest courses, events, and opportunities by subscribing to our newsletter.",
        },
      ],
    },
  },

  tutor: {
    name: "Tutor Registration",
    color: "from-emerald-500 to-green-600",
    icon: GraduationCap,
    benefits: [
      "Make a positive impact on students' lives",
      "Gain valuable teaching experience",
      "Build your professional portfolio",
      "Connect with a supportive educator community",
      "Flexible volunteer opportunities",
    ],
    steps: [
      {
        component: AccountStep,
        icon: User,
        title: "Account",
        slogan: "Create your tutor account",
      },
      {
        component: OtpStep,
        icon: Mail,
        title: "Verify",
        slogan: "Verify your email address",
      },
      {
        component: GeneralInfoStep,
        icon: Phone,
        title: "General",
        slogan: "Tell us about yourself",
      },
      {
        component: LegalSafetyStep,
        icon: Shield,
        title: "Safety",
        slogan: "Legal and safety verification",
      },
      {
        component: ExperienceSkillsStep,
        icon: Award,
        title: "Skills",
        slogan: "Your tutoring expertise",
      },
      {
        component: MotivationStep,
        icon: MessageSquare,
        title: "Motivation",
        slogan: "Why do you want to tutor?",
      },
      {
        component: ReviewStep,
        icon: Eye,
        title: "Review",
        slogan: "Review your information",
      },
      {
        component: TncStep,
        icon: FileText,
        title: "Complete",
        slogan: "Complete your registration",
      },
    ],
    payload: {
      role: "tutor",
      // Step 1: Account
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      otpVerified: false,

      // Step 3: General Information
      dateOfBirth: null,
      phoneNumber: null,
      educationLevel: [],
      isGovernmentTeacher: null,
      schoolName: null,
      languages: [],

      // Step 4: Legal & Safety
      hasConviction: null,
      hasAcademicSanctions: null,
      agreesToBackgroundCheck: null,
      certifiesInformationTrue: null,
      understandsPlatformOnly: null,
      understandsUnpaidPosition: null,

      // Step 5: Experience & Skills
      subjects: [],
      preferredGradeLevels: [],
      hasTutoredBefore: null,
      tutoringExperience: null,
      availability: [],

      // Step 6: Motivation
      motivationStatement: null,
      resumePortfolioLink: null,

      // Step 8: Terms
      tncAccepted: false,
      backgroundCheckConsent: false,
    },
    tips: {
      0: [
        // Account Step Tips
        {
          type: "info",
          icon: Shield,
          title: "Secure Password",
          description:
            "Use at least 8 characters with a mix of letters, numbers, and symbols for maximum security.",
        },
        {
          type: "success",
          icon: CheckCircle,
          title: "Valid Email Required",
          description:
            "Use an active email address as we'll send important updates and verification codes.",
        },
        {
          type: "tip",
          icon: Lightbulb,
          title: "Pro Tip",
          description:
            "Use your professional email if available - it helps establish credibility as an educator.",
        },
      ],
      1: [
        // OTP Step Tips
        {
          type: "info",
          icon: Clock,
          title: "Check Your Inbox",
          description:
            "The verification code should arrive within 2-3 minutes. Don't forget to check your spam folder.",
        },
        {
          type: "warning",
          icon: AlertCircle,
          title: "Code Expires Soon",
          description:
            "Your verification code is valid for 10 minutes. Request a new one if it expires.",
        },
        {
          type: "tip",
          icon: Mail,
          title: "Didn't receive it?",
          description:
            "Check your spam folder or click 'Resend Code' to get a new verification email.",
        },
      ],
      2: [
        // General Information Tips
        {
          type: "info",
          icon: Calendar,
          title: "Age Requirement",
          description:
            "You must be at least 17 years old to register as a tutor on our platform.",
        },
        {
          type: "success",
          icon: Phone,
          title: "Valid Phone Number",
          description:
            "We may contact you via phone for important updates about your tutoring opportunities.",
        },
        {
          type: "tip",
          icon: School,
          title: "Education Details",
          description:
            "Higher education levels and teaching credentials can help you match with more students.",
        },
      ],
      3: [
        // Legal & Safety Tips
        {
          type: "warning",
          icon: Shield,
          title: "Background Check Required",
          description:
            "All tutors must consent to background checks to ensure student safety.",
        },
        {
          type: "info",
          icon: CheckCircle,
          title: "Honesty is Key",
          description:
            "Please answer all questions truthfully. Dishonesty may result in disqualification.",
        },
        {
          type: "tip",
          icon: AlertCircle,
          title: "Platform Safety",
          description:
            "All tutoring sessions must be conducted through our platform for everyone's safety.",
        },
      ],
      4: [
        // Experience & Skills Tips
        {
          type: "success",
          icon: Award,
          title: "Share Your Expertise",
          description:
            "Select all subjects you're comfortable tutoring - you can always update this later.",
        },
        {
          type: "info",
          icon: Calendar,
          title: "Flexible Availability",
          description:
            "Set your preferred schedule - students will book sessions based on your availability.",
        },
        {
          type: "tip",
          icon: BookOpen,
          title: "New Tutors Welcome",
          description:
            "Don't worry if you're new to tutoring - we provide training and support materials.",
        },
      ],
      5: [
        // Motivation Tips
        {
          type: "info",
          icon: MessageSquare,
          title: "Be Authentic",
          description:
            "Share your genuine passion for education - this helps us match you with the right students.",
        },
        {
          type: "tip",
          icon: Star,
          title: "Make an Impact",
          description:
            "Your motivation statement helps students understand what makes you a great tutor.",
        },
        {
          type: "success",
          icon: Heart,
          title: "Volunteer Spirit",
          description:
            "Remember, tutoring with us is about making a difference in students' educational journey.",
        },
      ],
      6: [
        // Review Tips
        {
          type: "warning",
          icon: Eye,
          title: "Double Check Everything",
          description:
            "Please review all information carefully before submitting your application.",
        },
        {
          type: "info",
          icon: CheckCircle,
          title: "Almost There",
          description:
            "Once submitted, our team will review your application within 3-5 business days.",
        },
        {
          type: "tip",
          icon: AlertCircle,
          title: "Can't Edit Later",
          description:
            "Some information cannot be changed after submission, so please verify accuracy.",
        },
      ],
      7: [
        // Terms & Completion Tips
        {
          type: "info",
          icon: Shield,
          title: "Final Step",
          description:
            "By accepting our terms, you're committing to maintain high standards as a volunteer tutor.",
        },
        {
          type: "success",
          icon: CheckCircle,
          title: "Application Submitted",
          description:
            "After submission, you'll receive a confirmation email with next steps.",
        },
        {
          type: "tip",
          icon: Star,
          title: "Welcome to the Team",
          description:
            "Thank you for joining our mission to make quality education accessible to all students.",
        },
      ],
    },
  },
};
