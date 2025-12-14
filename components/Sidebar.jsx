'use client';

import Link from "next/link";
import { useState } from "react";
import {
  FaHome, FaUser, FaSignInAlt, FaUserPlus,
  FaNewspaper, FaAlignCenter, FaAddressCard, FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-white shadow px-4 py-3 flex justify-between items-center">
        <button onClick={() => setOpen(!open)} className="text-2xl">☰</button>
      </div>

      {/* Sidebar */}
      <aside
        onMouseLeave={() => setOpen(false)}
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white shadow-lg border-r px-6 py-8
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h1 className="text-xl font-bold mb-8">Nawigacja</h1>

        <nav className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center gap-3"><FaHome /> Strona główna</Link>
          <Link href="/user/signin" className="flex items-center gap-3"><FaSignInAlt /> Logowanie</Link>
          <Link href="/user/register" className="flex items-center gap-3"><FaUserPlus /> Rejestracja</Link>
          <Link href="/user/profile" className="flex items-center gap-3"><FaUser /> Profil</Link>
          <Link href="/articles" className="flex items-center gap-3"><FaNewspaper /> Artykuły</Link>
          <Link href="/wordsearch" className="flex items-center gap-3"><FaAlignCenter /> Wykreślanka</Link>
          <Link href="/user/about" className="flex items-center gap-3"><FaAddressCard /> O autorze</Link>
          <Link href="/user/signout" className="flex items-center gap-3"><FaSignOutAlt /> Wyloguj</Link>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden mt-6 text-gray-600"
          >
            Zamknij
          </button>
        </nav>
      </aside>
    </>
  );
}