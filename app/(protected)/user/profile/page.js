'use client'

import { useAuth } from "@/app/lib/AuthContext";
import { useState, useEffect } from "react";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function ProfilePage() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [firestoreError, setFirestoreError] = useState("");
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);

  if (!user) return <p>Ładowanie...</p>;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        if (snapshot.exists()) {
          setAddress(snapshot.data().address);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddress();
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;

    updateProfile(user, { displayName, photoURL })
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((err) => setError(err.message));

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          address: {
            city: e.target.city.value,
            street: e.target.street.value,
            zipCode: e.target.zipCode.value,
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.error(err);
      setFirestoreError("Brak uprawnień do zapisu danych adresowych.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">

      <h1 className="text-xl font-bold mb-4">Profil użytkownika</h1>

      {/* ZDJĘCIE PROFILOWE — TYLKO JEŚLI ISTNIEJE */}
      {user.photoURL && (
        <div className="flex justify-center mb-4">
          <img
            src={user.photoURL}
            alt="Avatar"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>
      )}

      {/* ALERT BŁĘDU */}
      {error && (
        <div className="p-3 mb-4 bg-red-200 text-red-800 rounded">
          {error}
        </div>
      )}

      {firestoreError && (
        <div className="p-3 mb-4 bg-red-200 text-red-800 rounded">
          {firestoreError}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col space-y-4">

        <div>
          <label className="block font-semibold mb-1">Display Name</label>
          <input
            name="displayName"
            defaultValue={user.displayName ?? ""}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email (read-only)</label>
          <input
            value={user.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Photo URL</label>
          <input
            name="photoURL"
            defaultValue={user.photoURL ?? ""}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Miasto</label>
          <input
            name="city"
            defaultValue={address?.city ?? ""}
            disabled={addressLoading}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Ulica</label>
          <input
            name="street"
            defaultValue={address?.street ?? ""}
            disabled={addressLoading}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Kod pocztowy</label>
          <input
            name="zipCode" 
            defaultValue={address?.zipCode ?? ""}
            disabled={addressLoading}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Zapisz zmiany
        </button>

      </form>
    </div>
  );
}