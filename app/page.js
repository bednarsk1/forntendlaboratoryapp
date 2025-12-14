import Image from "next/image";
import LineChart from "@/components/LineChart";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
<main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">        <h1 className="text-2xl font-bold mb-4">
          Przykładowy wykres SVG
        </h1>

        <div className="bg-white border border-white rounded-xl p-6 shadow-md">
          <LineChart
            data={[1, 2, 5, 2, 4, 3, 8, 7, 9, 3, 5, 7, 12]}
            stroke="gray"
            background="white"
          />
        </div>
      </main>
    </div>
  );
}
