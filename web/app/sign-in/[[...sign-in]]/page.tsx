import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md flex justify-center">
        <SignIn
          appearance={{
            elements: {
              card: "bg-surface border border-border shadow-[0_24px_80px_rgba(0,0,0,0.4)] rounded-3xl",
              headerTitle: "text-foreground font-black text-2xl",
              headerSubtitle: "text-white/60 text-sm",
              socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-2.5",
              footerActionLink: "text-accent hover:underline",
            },
          }}
        />
      </div>
    </div>
  );
}
