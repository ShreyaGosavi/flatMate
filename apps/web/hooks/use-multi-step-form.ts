"use client";

import { useState } from "react";
import { steps, stepSchemas, type StepFormData } from "@/lib/schema";

/**
 * Custom hook for multi-step form management
 *
 * Responsibilities:
 * - Track current step
 * - Store form data across steps
 * - Navigate between steps
 * - Handle form submission
 * - Provide the current step's validation schema
 */
export function useMultiStepForm() {

    // Current step index (0 = email, 2 = details)
    const [currentStep, setCurrentStep] = useState(0);

    // Accumulated form data from all steps
    const [formData, setFormData] = useState<Partial<StepFormData>>({});

    // Track if form has been successfully submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Track loading state for async operations (API calls)
    const [isLoading, setIsLoading] = useState(false);

    // Convenience flags
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    /**
     * Get the validation schema for the current step
     * This changes as user navigates through steps
     */
    const getCurrentStepSchema = () => stepSchemas[currentStep];

    /**
     * Navigate to next step
     * Only allowed if not on last step
     */
    const goToNextStep = () => {
        if (!isLastStep) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    /**
     * Navigate to previous step
     * Only allowed if not on first step
     */
    const goToPreviousStep = () => {
        if (!isFirstStep) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    /**
     * Update form data with new step data
     * Merges with existing data from previous steps
     */
    const updateFormData = (newData: Partial<StepFormData>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    /**
     * Handle final form submission
     * This is where you'll call your API to save to database
     */
    const submitForm = async (data: StepFormData) => {
        setIsLoading(true);
        try {
            // TODO: API call will go here in next steps
            console.log("✅ Final submitted data:", data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsSubmitted(true);
        } catch (error) {
            console.error("Submission error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Reset form to initial state
     * Useful for "Submit Another Form" functionality
     */
    const resetForm = () => {
        setFormData({});
        setCurrentStep(0);
        setIsSubmitted(false);
        setIsLoading(false);
    };

    return {
        // State
        currentStep,
        formData,
        isFirstStep,
        isLastStep,
        isSubmitted,
        isLoading,
        steps,

        // Functions
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm,
        resetForm,
        getCurrentStepSchema,
    };
}