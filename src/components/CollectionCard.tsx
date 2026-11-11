import Link from "next/link";
import type { Collection } from "@/lib/types";
import { LuxeImage } from "@/components/LuxeImage";
import { ArrowRight } from "@/components/icons";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-champagne/30">
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]">
          <LuxeImage
            tone={collection.coverTone}
            src={collection.coverImage}
            alt={collection.title}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-85" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[0.6rem] tracking-luxe uppercase text-ivory/70">
            {collection.category === "women" ? "Women" : "Men"}
          </p>
          <h3 className="font-serif-display text-2xl text-ivory mt-1">{collection.title}</h3>
          <p className="mt-2 flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-gold-soft opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </div>
      </div>
    </Link>
  );
}
