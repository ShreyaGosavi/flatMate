import type { Step } from "@/lib/schema";
import { Check } from "lucide-react";

interface ProgressStepsProps {
    currentStep: number;
    steps: Step[];
}

/**
 * Visual progress indicator showing all steps
 * Shows completed, current, and upcoming steps
 */
export default function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
    return (
        <div className="flex justify-center items-center max-w-md mx-auto"> {/* ← Center and limit width */}
            {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                    <div key={step.id} className="flex items-center">
                        {/* Step Circle */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    isCompleted
                                        ? "bg-primary text-primary-foreground"
                                        : isCurrent
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-gray-200 text-gray-500"
                                }`}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <Icon className="w-5 h-5" />
                                )}
                            </div>
                            {/* Step name */}
                            <span className="text-xs mt-2 font-medium whitespace-nowrap">
                                {step.name}
                            </span>
                        </div>

                        {/* Connecting Line (not after last step) */}
                        {index < steps.length - 1 && (
                            <div
                                className={`w-32 h-[2px] mx-4 transition-colors ${
                                    isCompleted ? "bg-primary" : "bg-gray-200"
                                }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}