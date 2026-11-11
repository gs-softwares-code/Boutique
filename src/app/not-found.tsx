import Link from "next/link";
import { EditorialCanvas } from "@/components/EditorialCanvas";

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <EditorialCanvas tone={11} label="404" />
      </div>
      <div className="absolute inset-0 bg-ivory/55" />
      <div className="relative z-10 text-center px-6">
        <p className="font-serif-display text-7xl text-espresso">404</p>
        <h1 className="mt-3 font-serif-display text-3xl text-espresso">
          This page has left the atelier
        </h1>
        <p className="mt-3 text-espresso/60">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/" className="btn-luxe">Back home</Link>
          <Link href="/collections" className="btn-luxe btn-luxe-outline">Explore collections</Link>
        </div>
      </div>
    </div>
  );
}
