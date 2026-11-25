import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** The site's dark glass card. Pass className to adjust padding or add hover effects. */
export default function GlassCard({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-green-500/30 bg-black/55 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
