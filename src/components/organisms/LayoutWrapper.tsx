"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingWrapper } from "./LoadingAnimation";
import { ProgressBar } from "./ProgressBar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header/footer on product detail pages
  const isProductPage = pathname?.startsWith("/products/");

  // Only show loading animation and progress bar on home page
  const isHomePage = pathname === "/";

  const content = (
    <>
      {!isProductPage && <Header />}
      {isHomePage && <ProgressBar />}
      <main>{children}</main>
      {!isProductPage && <Footer />}
    </>
  );

  // Wrap home page with loading animation
  if (isHomePage) {
    return <LoadingWrapper>{content}</LoadingWrapper>;
  }

  return content;
}
