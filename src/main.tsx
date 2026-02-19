import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

// ── Marketing pages (wrapped in SiteLayout) ───────────────────────────────────
import { SiteLayout } from "./components/SiteLayout";
import { HomePage } from "./pages/marketing/HomePage";
import { ServicesPage } from "./pages/marketing/ServicesPage";
import { GalleryPage } from "./pages/marketing/GalleryPage";
import { AboutPage } from "./pages/marketing/AboutPage";
import { ContactPage } from "./pages/marketing/ContactPage";

// ── Auth ──────────────────────────────────────────────────────────────────────
import { LoginPage } from "./pages/auth/LoginPage.tsx";
import { SignupPage } from "./pages/auth/SignupPage.tsx";

// ── Admin (protected) ────────────────────────────────────────────────────────
import { ClientsPage } from "./pages/admin/ClientsPage.tsx";
import { CampaignsPage } from "./pages/admin/CampaignsPage.tsx";
import { CalendarPage } from "./pages/admin/CalendarPage.tsx";
import { RequireAuth } from "./components/auth/RequireAuth.tsx";

// ── Client (protected) ───────────────────────────────────────────────────────
import { ClientBookPage } from "./pages/clientBookPage.tsx";
import { ClientMyBookingsPage } from "./pages/clientMyBookingsPage.tsx";
import { ClientPortfolioPage } from "./pages/clientPortfolioPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* ── Marketing site ──────────────────────────────────────────── */}
          <Route
            path="/"
            element={
              <SiteLayout>
                <HomePage />
              </SiteLayout>
            }
          />
          <Route
            path="/services"
            element={
              <SiteLayout>
                <ServicesPage />
              </SiteLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <SiteLayout>
                <GalleryPage />
              </SiteLayout>
            }
          />
          <Route
            path="/about"
            element={
              <SiteLayout>
                <AboutPage />
              </SiteLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <SiteLayout>
                <ContactPage />
              </SiteLayout>
            }
          />

          {/* ── Auth ────────────────────────────────────────────────────── */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />

          {/* ── Admin (protected) ───────────────────────────────────────── */}
          <Route
            path="/admin/clients"
            element={
              <RequireAuth>
                <ClientsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/campaigns"
            element={
              <RequireAuth>
                <CampaignsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/calendar"
            element={
              <RequireAuth>
                <CalendarPage />
              </RequireAuth>
            }
          />

          {/* ── Client (protected) ──────────────────────────────────────── */}
          <Route
            path="/book"
            element={
              <RequireAuth>
                <ClientBookPage />
              </RequireAuth>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <RequireAuth>
                <ClientMyBookingsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/portfolio"
            element={
              <RequireAuth>
                <ClientPortfolioPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
