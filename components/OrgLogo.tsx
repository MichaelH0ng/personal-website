import Image from "next/image";
import { cn } from "@/lib/utils";
import { orgInitials } from "@/lib/experience";

/** Round org logo that fills the circle. Falls back to the org's initials when there's no logo file. */
export default function OrgLogo({ src, name, size = 48, className }: { src: string; name: string; size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden",
        src ? "bg-white" : "bg-gradient-to-br from-green-500 to-green-800",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt="" width={size} height={size} className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold text-white" style={{ fontSize: size * 0.36 }} aria-hidden="true">
          {orgInitials(name)}
        </span>
      )}
    </div>
  );
}
