/**
 * TutorTncStep Component
 * ----------------------
 * Final step of tutor registration with Terms & Conditions and admin approval request
 *
 * FEATURES:
 *   - Displays Terms & Conditions
 *   - T&C acceptance checkbox
 *   - "Apply for Admin Approval" button instead of direct registration
 *   - Submits tutor application for admin review
 */

import React, { useState } from "react";
import { FileText, Check, Clock, Shield, UserCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useNotify } from "../../../notification.components/notificationProvider.component";
import { tutorApplicationApi } from "../../../../../apis/global.apis/tutorApplicationApi";

const TutorTncStep = ({ formData, setFormData, onPrev }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = useNotify();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!formData.tncAccepted) {
      notify("Please accept the Terms & Conditions to continue", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await tutorApplicationApi(formData);
      if (!res || !res.success) {
        notify(res?.message || "Application submission failed", "error");
      } else {
        notify(
          "Application submitted successfully! You will receive an email confirmation.",
          "success"
        );
        // Redirect to a confirmation page or login
        navigate("/v1/tutor-application-submitted");
      }
    } catch (e) {
      notify(
        e?.message || "Application submission failed. Please try again.",
        "error"
      );
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
          <UserCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Complete Your Application
        </h2>
        <p className="text-gray-600">
          Accept terms and apply for admin approval
        </p>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-gray-50 rounded-xl p-4 max-h-40 overflow-y-auto text-sm text-gray-600 space-y-2">
        <p className="font-semibold">Tutor Terms of Service</p>
        <p>
          By applying to become a tutor, you agree to these terms. Please read
          them carefully.
        </p>
        <p>
          NEXA provides a platform for qualified tutors to connect with students
          in a safe, supervised environment.
        </p>
        <p>As a volunteer tutor, you agree to:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Maintain professional conduct during all tutoring sessions</li>
          <li>
            Conduct all tutoring activities exclusively through our platform
          </li>
          <li>Respect student privacy and confidentiality</li>
          <li>Provide accurate and helpful educational support</li>
          <li>Report any concerns or issues to platform administrators</li>
          <li>
            Complete required background checks and verification processes
          </li>
        </ul>
        <p>Violation of these terms may result in removal from the platform.</p>
      </div>

      {/* T&C Acceptance */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={formData.tncAccepted || false}
            onChange={(e) =>
              setFormData({ ...formData, tncAccepted: e.target.checked })
            }
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
              formData.tncAccepted
                ? "bg-emerald-600 border-emerald-600"
                : "border-gray-300 group-hover:border-emerald-400"
            }`}
          >
            {formData.tncAccepted && (
              <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
            )}
          </div>
        </div>
        <span className="text-sm text-gray-700 leading-relaxed">
          I agree to the{" "}
          <Link target="_blank" to={"/v1/tutor-tnc"}>
            <span className="text-emerald-600 font-semibold">
              Tutor Terms and Conditions
            </span>
          </Link>{" "}
          and
          <Link target="_blank" to={"/v1/privacy"}>
            <span className="text-emerald-600 font-semibold">
              {" "}
              Privacy Policy
            </span>
          </Link>
          . I understand this is a volunteer position and consent to background
          verification.
        </span>
      </label>

      {/* Application Process Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">
              Application Review Process
            </h4>
            <div className="text-sm text-blue-700 mt-1 space-y-1">
              <p>After submitting your application:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Our team will review your application within 3-5 business days
                </li>
                <li>You'll receive an email confirmation immediately</li>
                <li>Background check process will be initiated</li>
                <li>
                  You may be contacted for additional information or an
                  interview
                </li>
                <li>
                  Approved tutors will receive platform access and training
                  materials
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Background Check Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">
              Background Check Required
            </h4>
            <p className="text-sm text-yellow-700 mt-1">
              All tutor applicants must successfully complete a background check
              before approval. This process helps ensure the safety of our
              student community. You will receive separate instructions for
              completing your background check after application review.
            </p>
          </div>
        </div>
      </div>

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
          className="flex-1 cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-3 rounded-xl hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Submitting Application...
            </>
          ) : (
            <>
              <UserCheck className="w-4 h-4" />
              Apply for Admin Approval
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TutorTncStep;
