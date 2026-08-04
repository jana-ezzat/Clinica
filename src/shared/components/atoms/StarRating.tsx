import { Star } from "lucide-react";

export default function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "ds-text-secondary"
          }
        />
      ))}
    </div>
  );
}
