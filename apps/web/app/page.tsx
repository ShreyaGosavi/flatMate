import MultiStepForm from "@/components/Authentication/MultiStepForm";
import illustration from "@/lib/img.png";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* LEFT: Illustration (40%) */}
            <div className="hidden md:flex md:w-2/5 items-center justify-center">
                <img
                    src={illustration.src}
                    alt="Sign up illustration"
                    className="max-w-[90%] max-h-[93vh] h-auto"
                />
            </div>

            {/* RIGHT: Form (60%) */}
            <div className="w-full md:w-3/5 flex items-center justify-center p-4">
                <MultiStepForm />
            </div>

        </div>
    );
}
