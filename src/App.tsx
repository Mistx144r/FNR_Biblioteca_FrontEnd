import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookSidebarProvider } from "@/contexts/SidebarBookContext.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BookSidebarProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<DashboardPage />} />
                    </Routes>
                </BrowserRouter>
            </BookSidebarProvider>
        </QueryClientProvider>
    </StrictMode>
);