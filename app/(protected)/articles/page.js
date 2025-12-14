'use client'

import { useAuth } from "@/app/lib/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) return <p>Ładowanie...</p>;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // 🔥 ZAPYTANIE FIRESTORE
        const q = query(
          collection(db, "articles"),
          where("user", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(data);
      } catch (err) {
        console.error("Błąd pobierania artykułów", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user]);

  if (loading) return <p>Ładowanie artykułów...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Moje artykuły</h1>

      {articles.length === 0 && (
        <p className="text-gray-600">
          Brak artykułów przypisanych do użytkownika.
        </p>
      )}

      <ul className="space-y-4">
        {articles.map(article => (
          <li
            key={article.id}
            className="border p-4 rounded hover:shadow"
          >
            <h2 className="text-lg font-semibold">
              {article.title}
            </h2>
            <p className="text-gray-700 mt-2">
              {article.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}