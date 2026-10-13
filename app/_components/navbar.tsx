"use client";

import { UserButton } from "@clerk/nextjs";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/transactions", label: "Transações" },
  { href: "/subscription", label: "Assinatura" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-solid">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={173}
              height={39}
              alt="Finance AI"
              className="h-auto w-[140px] sm:w-[173px]"
            />
          </Link>
          <div className="hidden items-center gap-6 md:flex lg:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                className={
                  pathname === link.href
                    ? "font-bold text-primary"
                    : "text-muted-foreground transition-colors hover:text-white"
                }
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <UserButton showName />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <UserButton />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="flex flex-col space-y-2 border-t border-solid px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === link.href
                  ? "bg-primary/10 font-bold text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-white"
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
