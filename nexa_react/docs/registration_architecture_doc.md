# Registration Component Architecture

## Overview

The registration system is designed to support multiple user types (Student, Tutor, Institution, Donor) and provides a step-based registration flow. Each user type can have its own steps and tips.

## Components

### RegistrationOnboarding
- Entry component for registration.
- Handles user role selection: Student, Tutor, Institution, Donor.
- Uses internal state `role` to track selected user type.
- Once a role is selected, it renders the corresponding registration steps.
- Provides animated transitions between selection and form views.

### RegistrationStepper
- Generic stepper component used to navigate through registration steps.
- Accepts `config` prop which defines:
  - `name`: Name of the registration process
  - `color`: Theme gradient for step headers
  - `icon`: Icon for header
  - `steps`: Array of step objects (`component`, `icon`, `title`, `slogan`)
  - `tips`: Tips mapped to each step
- Maintains internal state:
  - `currentStep`: Index of the active step
  - `formData`: Stores registration form data
  - `errors`: Stores validation errors
  - `touched`: Tracks fields that have been interacted with
- Handles next/previous step navigation and renders the current step component.
- Displays a sticky TipsCard on the left side (optional).

### TipsCard
- Displays step-specific tips and benefits.
- Receives props:
  - `tips`: List of tips for current step
  - `currentStep`: Active step index
  - `config`: Registration configuration containing theme and benefits
- Provides visual feedback on loading and uses animations for tip transitions.

### Step Components
- `AccountStep`: Collects personal information (first name, last name, email, password).
- `OtpStep`: Collects OTP code for email verification with auto-focus handling and resend logic.
- `TncStep`: Displays terms and conditions and allows user to submit final registration.
- Each step receives props:
  - `formData`, `setFormData` for data binding
  - `errors`, `setErrors` for validation handling
  - `touched`, `setTouched` for field interaction tracking
  - `onNext`, `onPrev` for step navigation

## Adding a New Step
- To add a new step, update the `steps` array in the registration configuration:
  ```javascript
  { component: NewStepComponent, icon: IconComponent, title: "Step Title", slogan: "Step slogan" }
  ```
- Requirements for a new step:
  - Must be a React functional component.
  - Accepts props: `formData`, `setFormData`, `errors`, `setErrors`, `touched`, `setTouched`, `onNext`, `onPrev`.
  - Should handle its own validation if needed and call `onNext()` to proceed.

## Data Flow
- `formData` is shared across steps using props.
- Validation occurs at each step with `errors` and `touched` state.
- Navigation between steps uses `onNext` and `onPrev` callbacks.
- Tips and benefits are dynamically rendered based on current step.

## Technical Notes
- Animations and transitions are used for smooth UI experience.
- Gradient themes are applied to each registration type.
- OTP inputs handle auto-focus, backspace navigation, and resend logic.
- Terms acceptance step simulates API submission before finalizing registration.
- The system is extensible to support additional user types or custom step sequences.

