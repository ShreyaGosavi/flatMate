"use client";

import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FormField from "./FormField";
import type { StepFormData } from "@/lib/schema";
import type {
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";

interface StepProps {
    register: UseFormRegister<StepFormData>;
    errors: Record<string, { message?: string }>;
    setValue: UseFormSetValue<StepFormData>;
}

/**
 * STEP 2: User Details
 * Collects username, password, confirm password, phone, and gender
 */
export default function DetailsStep({
                                        register,
                                        errors,
                                        setValue,
                                    }: StepProps) {
    const [gender, setGender] = React.useState<"" | "male" | "female">("");

    return (
        <div className="space-y-4">
            <CardTitle className="text-xl">Complete Your Profile</CardTitle>

            <p className="text-sm text-muted-foreground">
                Please provide your details to complete registration.
            </p>

            {/* Username */}
            <FormField
                id="userName"
                label="Username"
                register={register}
                errors={errors}
                placeholder="johndoe"
            />

            {/* Password */}
            <FormField
                id="password"
                label="Password"
                register={register}
                errors={errors}
                type="password"
                placeholder="••••••••"
            />

            {/* Confirm Password */}
            <FormField
                id="confirmPassword"
                label="Confirm Password"
                register={register}
                errors={errors}
                type="password"
                placeholder="••••••••"
            />

            {/* Phone */}
            <FormField
                id="phone"
                label="Phone Number"
                register={register}
                errors={errors}
                placeholder="+919876543210"
            />

            {/* Gender */}
            <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>

                <Select
                    value={gender}
                    onValueChange={(value) => {
                        setGender(value as "male" | "female");
                        setValue("gender", value as "male" | "female", {
                            shouldValidate: true,
                        });
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>

                {errors.gender && (
                    <p className="text-sm text-destructive">
                        {errors.gender.message}
                    </p>
                )}
            </div>
        </div>
    );
}
