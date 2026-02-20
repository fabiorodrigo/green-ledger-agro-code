import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import Methodologies from "./pages/Methodologies";
import MethodologyDetail from "./pages/MethodologyDetail";
import CertificationProcess from "./pages/CertificationProcess";
import Governance from "./pages/Governance";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/programas" element={<Programs />} />
            <Route path="/metodologias" element={<Methodologies />} />
            <Route path="/metodologias/:slug" element={<MethodologyDetail />} />
            <Route path="/certificacao" element={<CertificationProcess />} />
            <Route path="/governanca" element={<Governance />} />
            <Route path="/documentacao" element={<Documentation />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
