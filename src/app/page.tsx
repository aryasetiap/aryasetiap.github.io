import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Personal Web Portfolio</h1>
        <p className="mt-4 text-xl">Coming Soon...</p>
      </div>
      <div className="mt-8 flex gap-4">
        <Link href="/projects" className="underline">View Projects</Link>
        <Link href="/about" className="underline">About Me</Link>
      </div>
    </main>
  );
}
