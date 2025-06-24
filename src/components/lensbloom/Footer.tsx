import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container max-w-7xl py-12 text-center">
        <div className="flex justify-center items-center mb-4">
          <Image
            src="/image/logo.png"
            width={150}
            height={50}
            alt="LensBloom Logo"
          />
        </div>
        <p className="mb-6">Capturing life's most precious moments.</p>
        <div className="flex justify-center gap-6 mb-8">
          <Link href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity">
            <Twitter className="h-6 w-6" />
          </Link>
        </div>
        <p className="text-sm text-primary-foreground/70">
          © {currentYear} LensBloom Photography. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
