import type { ReactNode } from "react";

type RolesLayoutProps = {
  children: ReactNode;
};

export default function RolesLayout({ children }: RolesLayoutProps) {
  return <div className="min-h-screen bg-(--primecore-background)">{children}</div>;
}
