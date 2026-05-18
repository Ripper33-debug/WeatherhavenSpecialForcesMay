"use client";

import { usePathname } from "next/navigation";

export function SiteChrome({
  children,
  nav,
  footer,
}: {
  children: React.ReactNode;
  nav: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const bare = pathname === "/request-access" || pathname === "/login";

  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      {nav}
      {children}
      {footer}
    </>
  );
}
