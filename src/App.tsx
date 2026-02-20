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
import PublicConsultations from "./pages/PublicConsultations";
import VVBs from "./pages/VVBs";
import IntegritySafeguards from "./pages/IntegritySafeguards";
import Audits from "./pages/Audits";
import Platform from "./pages/Platform";
import ProjectRegistry from "./pages/ProjectRegistry";
import Marketplace from "./pages/Marketplace";
import Transparency from "./pages/Transparency";
import About from "./pages/About";
import Materials from "./pages/Materials";
import News from "./pages/News";

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
            <Route path="/processo" element={<CertificationProcess />} />
            <Route path="/certificacao" element={<CertificationProcess />} />
            <Route path="/consultas" element={<PublicConsultations />} />
            <Route path="/vvbs" element={<VVBs />} />
            <Route path="/governanca" element={<Governance />} />
            <Route path="/integridade" element={<IntegritySafeguards />} />
            <Route path="/auditorias" element={<Audits />} />
            <Route path="/plataforma" element={<Platform />} />
            <Route path="/registro" element={<ProjectRegistry />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/transparencia" element={<Transparency />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/materiais" element={<Materials />} />
            <Route path="/documentacao" element={<Documentation />} />
            <Route path="/noticias" element={<News />} />
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
