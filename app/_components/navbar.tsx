"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <Link
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
          href="/transactions"
        >
          Transações
        </Link>
        <Link
          className={
            pathname === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
          href="/subscription"
        >
          Assinatura
        </Link>
      </div>

      <UserButton showName />
    </nav>
  );
};

export default Navbar;
