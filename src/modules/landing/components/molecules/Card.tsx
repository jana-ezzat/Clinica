import { cn } from "@/lib/cn";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ds-bg-card ds-shadow-sm rounded-lg p-6 cursor-pointer transition-transform duration-300  hover:shadow-lg",
        className,
      )}>
      {children}
    </div>
  );
}
    