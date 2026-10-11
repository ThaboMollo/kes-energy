import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="font-display text-6xl font-black text-sun-500">404</p>
      <h1 className="mt-4 font-display text-3xl font-black text-navy-950">Page not found</h1>
      <p className="mt-3 text-navy-700">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-full bg-navy-900 px-6 py-3 font-bold text-white">Go home</Link>
        <Link href="/careers" className="rounded-full border-2 border-navy-900 px-6 py-3 font-bold text-navy-900">View careers</Link>
      </div>
    </section>
  );
}
