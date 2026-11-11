import Image from "next/image";
import { EditorialCanvas } from "@/components/EditorialCanvas";

export function LuxeImage({
  tone,
  src,
  alt,
  className,
  imgClassName,
  sizes,
  priority,
}: {
  tone: number;
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={className ?? "relative w-full h-full"}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          className={imgClassName ?? "object-cover"}
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }
  return (
    <div className={className ?? "relative w-full h-full"}>
      <EditorialCanvas tone={tone} label={alt} className="canvas-art" />
    </div>
  );
}
