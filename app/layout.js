// app/layout.js
import './globals.css';
import Providers from "@/app/providers";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: 'Frontend Laboratory App',
  description: 'A school project in Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex bg-gray-100">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <main className="p-8 flex-1">
            <Providers>{children}</Providers>
          </main>

          <footer className="bg-gray-200 text-gray-700 text-center py-4 text-sm">
            2025 Frontend Laboratory App — Piotr Bednarski 15240
          </footer>
        </div>
      </body>
    </html>
  );
}