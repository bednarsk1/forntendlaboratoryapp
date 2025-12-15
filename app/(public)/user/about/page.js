export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">
        O autorze
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Autor
        </h2>
        <p className="text-gray-700">
          Nazywam się <strong>Piotrek</strong> i jestem studentem informatyki. Aplikacja została wykonana w ramach zajęć
          laboratoryjnych z technologii webowych.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          O aplikacji
        </h2>
        <p className="text-gray-700">
          Projekt jest aplikacją internetową stworzoną w technologii
          <strong> Next.js </strong> z wykorzystaniem <strong>React</strong>,
          <strong> Firebase</strong> oraz <strong>Tailwind CSS</strong>.
        </p>
        <p className="text-gray-700 mt-2">
          Aplikacja zawiera mechanizm uwierzytelniania użytkowników,
          autoryzację dostępu do wybranych ścieżek oraz interaktywny
          komponent wykreślanki słów.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Technologie
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Next.js (App Router)</li>
          <li>React</li>
          <li>Firebase (Auth, Firestore)</li>
          <li>Tailwind CSS</li>
          <li>Playwright (testy E2E)</li>
        </ul>
      </section>
    </div>
  );
}
