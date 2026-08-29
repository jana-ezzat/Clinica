import React from "react";

interface AvatarInitialProps {
  name: string;
}

export default function AvatarInitial({ name }: AvatarInitialProps) {
  const initial = name.trim().charAt(0) || "?";

  return (
    <div className="ds-bg-icon flex h-9 w-9 items-center justify-center rounded-full">
      <span className="ds-text-primary text-sm font-semibold">{initial}</span>
    </div>
  );
}
