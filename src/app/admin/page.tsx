import { SignInButton } from "@/components/SignInButton";
import "./dashboard/dashboardStyles.css";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInButton />
      </div>
    </div>
  );
}
