'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useState } from "react";

export default function SignInForm() {
  const params = useSearchParams();
  const router = useRouter();

  const returnUrl = params.get("returnUrl");
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const email = e.target["email"].value;
    const password = e.target["password"].value;

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        const user = userCredential.user;

        // ⭐ TASK 6: Email niezweryfikowany → redirect + auto logout
        if (!user.emailVerified) {
          signOut(auth); // automatyczne wylogowanie
          router.push(`/user/verify?email=${encodeURIComponent(user.email)}`);
          return;
        }

        // ⭐ jeśli email zweryfikowany → normalne logowanie
        if (returnUrl) {
          router.push(returnUrl);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        // usuwamy console.error zgodnie z zadaniem 8
        setError("Niepoprawne dane logowania");
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl border p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Logowanie
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Podaj email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hasło
            </label>
            <input
                id="password"
              type="password"
              name="password"
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Podaj hasło"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-md shadow hover:bg-blue-700 transition"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
}