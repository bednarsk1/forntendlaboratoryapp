'use client'

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {

  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    signOut(auth);
    router.push("/");
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Wylogowanie</h1>

      <form onSubmit={onSubmit}>
        <button 
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Wyloguj
        </button>
      </form>
    </div>
  );
}