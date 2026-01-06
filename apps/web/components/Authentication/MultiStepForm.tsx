"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { stepSchemas, type StepFormData } from "@/lib/schema";
import ProgressSteps from "./progressSteps";
import EmailStep from "./EmailStep";
import DetailsStep from "./DetailsStep";

export default function MultiStepForm() {
    const [isEmailVerified, setIsEmailVerified] = React.useState(false);

    const {
        currentStep,
        formData,
        isFirstStep,
        isLastStep,
        isSubmitted,
        isLoading,
        steps,
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm,
        resetForm,
    } = useMultiStepForm();

    /* ---------------------------------------------
       React Hook Form
       --------------------------------------------- */
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<StepFormData>({
        mode: "onChange",
        defaultValues: formData,
    });

    /* ---------------------------------------------
       NEXT / SUBMIT HANDLER
       --------------------------------------------- */
    const onNext = async (data: StepFormData) => {
        const schema = stepSchemas[currentStep];

        const result = schema.safeParse(data);
        if (!result.success) return;

        if (currentStep === 0 && !isEmailVerified) return;

        const updatedData = { ...formData, ...data };
        updateFormData(updatedData);

        if (isLastStep) {
            try {
                await submitForm(updatedData);
            } catch (err) {
                console.error("Submission failed:", err);
            }
        } else {
            goToNextStep();
        }
    };

    /* ---------------------------------------------
       SUCCESS SCREEN
       --------------------------------------------- */
    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Success!</h2>
                        <p className="text-gray-600 mb-6">
                            Your registration has been completed successfully.
                        </p>
                        <Button onClick={resetForm} className="w-full">
                            Submit Another Form
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    /* ---------------------------------------------
       MAIN FORM
       --------------------------------------------- */
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <ProgressSteps currentStep={currentStep} steps={steps} />
                </CardHeader>

                <CardContent className="space-y-6">
                    {currentStep === 0 && (
                        <EmailStep
                            register={register}
                            errors={errors}
                            watch={watch}
                            onEmailVerified={() => setIsEmailVerified(true)}
                        />
                    )}

                    {currentStep === 1 && (
                        <DetailsStep
                            register={register}
                            errors={errors}
                            setValue={setValue}
                        />
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={goToPreviousStep}
                            disabled={isFirstStep}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                        </Button>

                        <Button
                            type="button"
                            onClick={handleSubmit(onNext)}
                            disabled={isLoading || (currentStep === 0 && !isEmailVerified)}
                        >
                            {isLoading ? (
                                <>
                                    <Check className="w-4 h-4 mr-1 animate-spin" />
                                    Submitting...
                                </>
                            ) : isLastStep ? (
                                "Submit"
                            ) : (
                                <>
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
