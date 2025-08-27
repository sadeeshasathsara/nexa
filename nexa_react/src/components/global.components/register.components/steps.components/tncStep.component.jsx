/**
 * TncStep Component
 * -----------------
 * Final step of the registration process where the user must accept Terms & Conditions (T&C).
 *
 * PROPS:
 *   @param {Object} props
 *   @param {Object} props.formData
 *     - Object holding current values of the form fields. Should include `tnc` boolean flag.
 *   @param {Function} props.setFormData
 *     - Function to update the formData object.
 *   @param {Function} props.onPrev
 *     - Function to go back to the previous step in the registration flow.
 *
 * FEATURES:
 *   - Displays Terms & Conditions text in a scrollable box.
 *   - Checkbox for user to accept T&C and Privacy Policy.
 *   - "Back" button to go to the previous step.
 *   - "Complete Registration" button which:
 *       - Is disabled until T&C is accepted.
 *       - Shows a loading spinner while simulating form submission.
 *       - Logs final formData and shows a success alert on completion.
 *
 * USAGE:
 *   <TncStep
 *     formData={formData}
 *     setFormData={setFormData}
 *     onPrev={handlePrevStep}
 *   />
 */

import React, { useState, useEffect } from "react";
import { User, Mail, FileText, GraduationCap, BookOpen, Eye, EyeOff, Check, X, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotify } from "../../notification.components/notificationProvider.component";
import { registerApi } from "../../../../apis/global.apis/register.api";

const TncStep = ({ formData, setFormData, onPrev }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const notify = useNotify();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const res = await registerApi(formData);
            if (!res || !res.success) {
                notify(res.message, 'error');
            } else {
                notify(res.message, 'success');
            }

        } catch (e) {
            notify(e.message, 'error');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Terms & Conditions</h2>
                <p className="text-gray-600">Please review and accept our terms</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 max-h-40 overflow-y-auto text-sm text-gray-600 space-y-2">
                <p className="font-semibold">Terms of Service</p>
                <p>By using our service, you agree to these terms. Please read them carefully.</p>
                <p>NEXA provides tools for students, tutors, institutions, and donors to connect and learn in a safe environment.</p>
                <p>You are responsible for the information you share, your interactions with others, and complying with all rules. Misuse of the platform may result in account suspension or removal.</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                    <input
                        type="checkbox"
                        checked={formData.tncAccepted || false}
                        onChange={(e) => setFormData({ ...formData, tncAccepted: e.target.checked })}
                        className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${formData.tncAccepted
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'border-gray-300 group-hover:border-indigo-400'
                        }`}>
                        {formData.tncAccepted && (
                            <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                        )}
                    </div>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">
                    I agree to the <Link target="_blank" to={'/v1/tnc'}><span className="text-indigo-600 font-semibold">Terms and Conditions</span> </Link> and
                    <Link target="_blank" to={'/v1/privacy'}><span className="text-indigo-600 font-semibold"> Privacy Policy</span> </Link>
                </span>
            </label>

            <div className="flex gap-3">
                <button
                    onClick={onPrev}
                    className="flex-1 cursor-pointer border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!formData.tncAccepted || isSubmitting}
                    className="flex-1 cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Completing...
                        </>
                    ) : (
                        'Complete Registration'
                    )}
                </button>
            </div>
        </div>
    );
};

export default TncStep