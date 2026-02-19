export function LandingPageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-screen-2xl px-2 sm:px-4 lg:px-6 ${className}`}>
      {children}
    </div>
  );
}