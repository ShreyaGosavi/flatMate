"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Loader2, Check, Mail } from "lucide-react";
import FormField from "./FormField";
import type { StepFormData } from "@/lib/schema";
import type {
    UseFormRegister,
    UseFormWatch,
} from "react-hook-form";

interface StepProps {
    register: UseFormRegister<StepFormData>;
    watch: UseFormWatch<StepFormData>;
    errors: Record<string, { message?: string }>;
    onEmailVerified: () => void;
}

export default function EmailStep({
                                      register,
                                      watch,
                                      errors,
                                      onEmailVerified,
                                  }: StepProps) {
    const [status, setStatus] = React.useState<
        "idle" | "sending" | "sent" | "verified"
    >("idle");

    const [error, setError] = React.useState("");
    const email = watch("email");

    /* =====================================================
       STEP 1: Send magic link
       ===================================================== */

    const handleSendMagicLink = async () => {
        if (!email) return;

        setError("");
        setStatus("sending");

        try {
            const res = await fetch("/api/send-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("sent");
        } catch {
            setError("Failed to send verification email. Try again.");
            setStatus("idle");
        }
    };

    /* =====================================================
       STEP 2: Poll verification status
       ===================================================== */

    React.useEffect(() => {
        if (status !== "sent" || !email) return;

        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        const checkVerification = async () => {
            try {
                const res = await fetch(
                    `/api/check-verification?email=${encodeURIComponent(email)}`
                );
                const data = await res.json();

                if (data.verified === true) {
                    setStatus("verified");
                    onEmailVerified();
                }
            } catch {
                // silent retry
            }
        };

        checkVerification();
        interval = setInterval(checkVerification, 3000);

        timeout = setTimeout(() => {
            setStatus((prev) => {
                if (prev === "sent") {
                    setError("Verification timed out. Please try again.");
                    return "idle";
                }
                return prev;
            });
        }, 5 * 60 * 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [status, email, onEmailVerified]);

    /* =====================================================
       RENDER
       ===================================================== */

    return (
        <div className="space-y-4">
            <CardTitle className="text-xl">Verify Your Email</CardTitle>

            <p className="text-sm text-muted-foreground">
                We will send you a verification email. Click the link inside to continue.
            </p>

            <FormField
                id="email"
                label="Email Address"
                register={register}
                errors={errors}
                type="email"
                placeholder="you@example.com"
            />

            {/* ---------- ACTION STATES ---------- */}

            {status === "idle" && (
                <Button
                    type="button"
                    onClick={handleSendMagicLink}
                    disabled={!email || !!errors.email}
                    className="w-full"
                >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Verification Link
                </Button>
            )}

            {status === "sending" && (
                <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                </Button>
            )}

            {status === "sent" && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <p className="font-medium">Check Your Email</p>
                            <p className="text-sm text-blue-800">
                                A magic link was sent to <strong>{email}</strong>.
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Waiting for verification...
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {status === "verified" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-green-900">
                                Email Verified!
                            </p>
                            <p className="text-sm text-green-800">{email}</p>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
}
