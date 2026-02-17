import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { LoginPage } from "./pages/auth/LoginPage.tsx";
import { SignupPage } from "./pages/auth/SignupPage.tsx";
import { ClientsPage } from "./pages/admin/ClientsPage.tsx";
import { CampaignsPage } from "./pages/admin/CampaignsPage.tsx";
import { CalendarPage } from "./pages/admin/CalendarPage.tsx";
import { RequireAuth } from "./components/auth/RequireAuth.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
