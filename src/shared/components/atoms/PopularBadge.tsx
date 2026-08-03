export default function PopularBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="absolute -top-3 left-1/2 -translate-x-1/2 ds-bg-button-primary ds-text-inverse text-xs font-medium px-4 py-1 rounded-full">
      {children}
    </span>
  );
}
