'use client'

import { useSearchParams } from "next/navigation";
import { signOut, getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function VerifyEmail() {
  const params = useSearchParams();
  const email = params.get("email");

  useEffect(() => {
    const auth = getAuth();
    signOut(auth);
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded max-w-md">
      <h1 className="text-xl font-bold mb-4">
        Zweryfikuj swój adres email
      </h1>

      <p>
        Link weryfikacyjny został wysłany na adres:{" "}
        <strong>{email}</strong>
      </p>
    </div>
  );
}