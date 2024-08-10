import Image from "next/image";
import { LampDemo } from "@/components/lamp";
import { BentoGridThirdDemo } from "@/components/bento-grid";
import { FloatingNav } from "@/components/navabar";

export default function Home() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Contact", link: "mailto:26dwivediom@gmail.com" },
    { name: "About Me", link: "https://github.com/OmDwivedi1237" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <LampDemo>
        <h1 className="text-center text-5xl font-bold text-purple-400">
          Welcome to Pantry Bro
        </h1>
      </LampDemo>

      <FloatingNav navItems={navItems} />

      <div className="flex-grow bg-zinc-950 p-8">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-purple-500 mb-6">What We Do</h2>
          <p className="text-lg text-gray-300 mb-8">
            Pantry Bro helps you manage and organize your pantry with ease. Our platform provides intuitive tools for tracking inventory, planning meals, and reducing food waste.
          </p>
        </section>

        <BentoGridThirdDemo />
      </div>

      <footer className="bg-zinc-950 p-6 text-center text-gray-400">
        <div className="flex justify-center mb-4">
          <a
            className="flex items-center gap-2"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Pantry Bro. All rights reserved.</p>
      </footer>
    </main>
  );
}
