import React from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { colors } from "../styles/ui";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      {/* Responsive nav CSS injected once */}
      <style>{responsiveCss}</style>
      <div style={{ minHeight: "100vh", backgroundColor: colors.bg, display: "flex", flexDirection: "column" }}>
        <SiteNav />
        <main style={{ flex: 1 }}>{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}

// Inject media-query rules that can't be expressed in inline React.CSSProperties
const responsiveCss = `
  /* Desktop: show links, hide hamburger */
  @media (min-width: 640px) {
    .site-nav-desktop { display: flex !important; }
    .site-nav-hamburger { display: none !important; }
  }
  /* Mobile: hide links, show hamburger */
  @media (max-width: 639px) {
    .site-nav-desktop { display: none !important; }
    .site-nav-hamburger { display: flex !important; }
  }
`;
