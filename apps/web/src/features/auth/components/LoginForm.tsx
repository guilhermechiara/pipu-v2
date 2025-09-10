"use client";

import { useCallback, useEffect, useState } from "react";
import { RequestCodeForm } from "./RequestCodeForm";
import { VerifyCodeForm } from "./VerifyCodeForm";
import { useRouter } from "next/navigation";

type LoginStep = "request" | "confirmation";

const STORAGE_KEY = "login_email";

const LoginForm = () => {
  const [step, setStep] = useState<LoginStep>("request");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const savedEmail = sessionStorage.getItem(STORAGE_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
      setStep("confirmation");
    }
  }, []);

  useEffect(() => {
    if (email) {
      sessionStorage.setItem(STORAGE_KEY, email);
    }
  }, [email]);

  const handleRequestSuccess = useCallback((newEmail: string) => {
    setEmail(newEmail);
    setStep("confirmation");
  }, []);

  const handleGoBack = useCallback(() => {
    setStep("request");
  }, []);

  const handleSuccess = useCallback(() => {
    setEmail("");
    sessionStorage.removeItem(STORAGE_KEY);

    router.push("/");
  }, []);

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-4">
        <h2 className="text-primary mt-6 text-3xl font-normal leading-tight">
          Cada equipe tem potencial para ser
          <span className="font-semibold"> extraordinária.</span>
        </h2>

        <p className="text-blue-secondary text-sm leading-relaxed">
          Para realizar o primeiro acesso à plataforma, você precisa preencher o
          campo abaixo. Após isso, irá receber o código de acesso.
        </p>
      </div>

      <div className="space-y-6">
        {step === "request" && (
          <RequestCodeForm
            initialEmail={email}
            onSuccess={handleRequestSuccess}
          />
        )}

        {step === "confirmation" && (
          <VerifyCodeForm
            email={email}
            onPrevious={handleGoBack}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export { LoginForm };
