"use client";
import { signInWithPopup } from "firebase/auth";
import { Button } from "../ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function SignInButton() {
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/admin/dashboard");
    } catch (error) {
      toast({
        variant: "error",
        title: "Erro no login",
        description: "Não foi possível efetuar o login com o Google.",
      });
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <Button variant="outline" className="w-full" onClick={handleSignIn}>
        Login com o Google
      </Button>
    </div>
  );
}
