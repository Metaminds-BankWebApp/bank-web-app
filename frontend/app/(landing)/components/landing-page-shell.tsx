export function LandingPageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1880px] px-3 sm:px-5 lg:px-7 ${className}`}>
      {children}
    </div>
  );
}
