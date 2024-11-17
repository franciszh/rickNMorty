import React from "react";
import { NavLinks } from "@/app/ui/nav-links";

export default function AfterSignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavLinks />
      <main>{children}</main>
    </>
  );
}
