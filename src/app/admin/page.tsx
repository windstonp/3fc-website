"use client";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "@/hooks/use-toast";
import "./dashboard/dashboardStyles.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email !== "joaor4e@gmail.com") {
        toast({
          variant: "error",
          title: "Erro no login",
          description: "Você não possui permissão para fazer o login.",
        });
        await signOut(auth);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast({
        variant: "error",
        title: "Erro no login",
        description: "Não foi possível efetuar o login com o Google.",
      });
    }
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Button variant="outline" className="w-full" onClick={handleSignIn}>
            Login com o Google
          </Button>
        </div>
      </div>
    </div>
  );
}
