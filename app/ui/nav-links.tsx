"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex-center nav">
      <Link
        href="/information-page"
        className={`nav-item ${
          pathname === "/information-page" ? "active" : ""
        }`}
      >
        Information Page
      </Link>
      <Link
        href="/edit-profile"
        className={`nav-item ${pathname === "/edit-profile" ? "active" : ""}`}
      >
        Edit Profile
      </Link>
    </nav>
  );
}
