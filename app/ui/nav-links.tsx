"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      className="flex-center nav"
      role="navigation"
      aria-label="Main"
      autoFocus
    >
      <Link
        href="/information-page"
        tabIndex={0}
        className={`nav-item ${
          pathname === "/information-page" ? "active" : ""
        }`}
      >
        Information Page
      </Link>
      <Link
        href="/edit-profile"
        tabIndex={0}
        className={`nav-item ${pathname === "/edit-profile" ? "active" : ""}`}
      >
        Edit Profile
      </Link>
    </nav>
  );
}
