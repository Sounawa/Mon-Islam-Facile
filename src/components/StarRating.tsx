"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  stars: number;
  totalStars?: number;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({
  stars,
  totalStars = 3,
  size = "md",
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center gap-1" aria-label={`${stars} étoiles sur ${totalStars}`}>
      {Array.from({ length: totalStars }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} transition-all duration-500 ${
            i < stars
              ? "fill-amber-400 text-amber-400 scale-100"
              : "fill-gray-200 text-gray-200 scale-90"
          }`}
          style={{
            transitionDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}
