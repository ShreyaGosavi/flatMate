import {z} from 'zod';
import { Mail, UserCircle } from "lucide-react";

/** --- Step Schemas --- */
export const emailInfoSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const detailsInfoSchema = z
    .object({
        userName: z.string().min(1, "Please enter username"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special symbol"
            ),
        confirmPassword: z.string(),
        gender: z.enum(["male", "female"]),
        phone: z
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .regex(
                /^\+?[1-9]\d{9,14}$/,
                "Please enter a valid phone number with country code"
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
/** --- Step Data Types --- */
export type EmailInfo = z.infer<typeof emailInfoSchema>;
export type DetailsInfo = z.infer<typeof detailsInfoSchema>;

/** --- Union of All Step Data --- */
export type StepFormData = EmailInfo | DetailsInfo;
export type AllFormFields = EmailInfo & DetailsInfo;

/** --- Step Metadata Type --- */
export interface Step {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
}

/** --- Step definitions with icons --- */
export const steps: Step[] = [
    {
        id: "email",
        name: "Email",
        icon: Mail
    },
    {
        id: "details",
        name: "Details",
        icon: UserCircle
    },
];

/** --- Array of schemas matching step order --- */
export const stepSchemas = [
    emailInfoSchema,
    detailsInfoSchema,
];

