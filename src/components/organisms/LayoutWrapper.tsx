"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header/footer on product detail pages
  const isProductPage = pathname?.startsWith("/products/");

  return (
    <>
      {!isProductPage && <Header />}
      <main>{children}</main>
      {!isProductPage && <Footer />}
    </>
  );
}
