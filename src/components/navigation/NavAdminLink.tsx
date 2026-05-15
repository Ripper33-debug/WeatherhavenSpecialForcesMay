"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function isAdminSession(userEmail: string | undefined, adminEmail: string): boolean {
  const admin = adminEmail.trim().toLowerCase();
  if (!admin || !userEmail) return false;
  return userEmail.trim().toLowerCase() === admin;
}

export function NavAdminLink({
  adminEmail,
  className = "",
  onNavigate,
  mobile = false,
}: {
  adminEmail: string;
  className?: string;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!adminEmail.trim()) {
      setVisible(false);
      return;
    }

    const supabase = createClient();

    const sync = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setVisible(isAdminSession(user?.email, adminEmail));
    };

    void sync();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void sync();
    });

    return () => subscription.unsubscribe();
  }, [adminEmail]);

  if (!visible) return null;

  const active = pathname.startsWith("/admin");

  if (mobile) {
    return (
      <Link
        href="/admin"
        onClick={onNavigate}
        className={`border-b border-[rgba(255,255,255,0.08)] py-4 text-[24px] leading-snug text-white no-underline transition-opacity hover:opacity-70 ${
          active ? "opacity-100" : ""
        } ${className}`}
      >
        Admin
      </Link>
    );
  }

  return (
    <Link
      href="/admin"
      onClick={onNavigate}
      className={`text-[14px] text-[#8a9099] no-underline transition-colors hover:text-white ${
        active ? "text-white" : ""
      } ${className}`}
    >
      Admin
    </Link>
  );
}
