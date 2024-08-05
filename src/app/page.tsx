import Image from "next/image";
import { LampDemo } from "@/components/lamp"; // Adjust the path if necessary

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <LampDemo>
        <h1 className="text-center text-5xl font-bold text-purple-400">
          Welcome to Pantry Bro
        </h1>
      </LampDemo>

      <div className="flex-grow bg-zinc-950 p-8">
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-purple-500 mb-6">What We Do</h2>
          <p className="text-lg text-gray-300 mb-8">
            Pantry Bro helps you manage and organize your pantry with ease. Our platform provides intuitive tools for tracking inventory, planning meals, and reducing food waste.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Features</h3>
              <p className="text-gray-300">
                Discover the key features that make Pantry Bro an essential tool for your kitchen management.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Pricing</h3>
              <p className="text-gray-300">
                Explore our pricing plans and choose the one that best fits your needs.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Contact</h3>
              <p className="text-gray-300">
                Get in touch with us for any questions or support.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">About Us</h3>
              <p className="text-gray-300">
                Learn more about our mission and the team behind Pantry Bro.
              </p>
            </div>
          </div>
        </section>
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
