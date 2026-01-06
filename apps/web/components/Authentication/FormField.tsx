import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import type { AllFormFields, StepFormData } from "@/lib/schema";

/**
 * Reusable form field component
 * Eliminates repetitive code for input fields
 */

interface FormFieldProps {
    id: keyof AllFormFields;
    label: string;
    register: ReturnType<typeof useForm<StepFormData>>["register"];
    errors: Record<string, { message?: string }>;
    type?: string;
    maxLength?: number;
    placeholder?: string;
}

export default function FormField({id, label, register, errors, type = "text", maxLength, placeholder,}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                maxLength={maxLength}
                placeholder={placeholder}
                {...register(id)}
            />
            {errors[id] && (
                <p className="text-sm text-destructive">{errors[id]?.message}</p>
            )}
        </div>
    );
}