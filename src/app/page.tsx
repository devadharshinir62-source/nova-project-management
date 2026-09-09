import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black p-8">
      <h1 className="text-4xl font-bold text-center mb-4">NOVA — Team Productivity Platform</h1>
      <p className="text-lg text-center mb-8">Plan. Collaborate. Deliver.</p>
      <Image src="/next.svg" alt="Next.js logo" width={100} height={100} priority />
    </main>
  );
}
