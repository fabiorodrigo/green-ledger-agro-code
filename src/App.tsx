import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
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
import Projetos from "./pages/Projetos";
import Comunicados from "./pages/Comunicados";
import Consultas from "./pages/Consultas";
import Tarifas from "./pages/Tarifas";
import Plataforma from "./pages/Plataforma";
import VVBs from "./pages/VVBs";
import Sobre from "./pages/Sobre";
import Materiais from "./pages/Materiais";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
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
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/comunicados" element={<Comunicados />} />
              <Route path="/consultas" element={<Consultas />} />
              <Route path="/tarifas" element={<Tarifas />} />
              <Route path="/plataforma" element={<Plataforma />} />
              <Route path="/vvbs" element={<VVBs />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/materiais" element={<Materiais />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
