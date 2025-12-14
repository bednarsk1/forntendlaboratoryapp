'use client'

import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";

export default function RegisterPage() {
  const { user } = useAuth();
  const router = useRouter();

  const auth = getAuth();
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  // Jeżeli jesteś zalogowana/y → przenieś na profil
  useEffect(() => {
    if (user) {
      router.push("/user/profile");
    }
  }, [user, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setLoading(true);

    const email = e.target["email"].value.trim();
    const password = e.target["password"].value;
    const password2 = e.target["password2"].value;

    if (password !== password2) {
      setRegisterError("Hasła nie są takie same.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // userCredential.user istnieje — konto utworzone

      // Wyślij mail weryfikacyjny i poczekaj
      await sendEmailVerification(auth.currentUser);

      // Wyloguj użytkownika (Firebase automatycznie loguje po rejestracji)
      await signOut(auth);

      // Przekieruj do strony verify z emailem
      router.push(`/user/verify?email=${encodeURIComponent(email)}`);
    } catch (error) {
      // Obsługa najczęstszych kodów błędów
      const code = error?.code || "";

      if (code === "auth/email-already-in-use") {
        setRegisterError("Użytkownik z tym adresem email już istnieje.");
      } else if (code === "auth/weak-password") {
        setRegisterError("Hasło jest zbyt słabe. Użyj co najmniej 6 znaków.");
      } else if (code === "auth/invalid-email") {
        setRegisterError("Adres email ma nieprawidłowy format.");
      } else {
        setRegisterError("Błąd podczas rejestracji: " + (error?.message || "nieznany"));
      }
      console.debug("register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Rejestracja
        </h1>

        {registerError && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {registerError}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col space-y-4" noValidate>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="Podaj email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Hasło</label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="Podaj hasło"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Powtórz hasło</label>
            <input
              name="password2"
              type="password"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="Powtórz hasło"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white py-2 rounded transition`}
          >
            {loading ? "Trwa rejestracja..." : "Zarejestruj się"}
          </button>
        </form>
      </div>
    </div>
  );
}