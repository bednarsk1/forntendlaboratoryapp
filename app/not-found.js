export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 — Nie znaleziono strony
      </h1>

      <p className="text-gray-600 mb-6">
        Podana ścieżka nie istnieje lub została przeniesiona.
      </p>

      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        Powrót do strony głównej
      </a>
    </div>
  );
}