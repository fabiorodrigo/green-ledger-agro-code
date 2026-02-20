import { useLocation } from "react-router-dom";
import {
  Award,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  ShieldCheck,
  Building2,
  Scale,
  Search,
  Monitor,
  FolderKanban,
  Store,
  Eye,
  Info,
  FileText,
  Newspaper,
  Mail,
  ExternalLink,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo-horizontal.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navGroups = [
  {
    label: "Certificação",
    items: [
      { title: "Programas", url: "/programas", icon: Award },
      { title: "Metodologias", url: "/metodologias", icon: BookOpen },
      { title: "Processo de Certificação", url: "/processo", icon: ClipboardCheck },
      { title: "Consultas Públicas", url: "/consultas", icon: MessageSquare },
    ],
  },
  {
    label: "Governança",
    items: [
      { title: "VVBs", url: "/vvbs", icon: ShieldCheck },
      { title: "Governança", url: "/governanca", icon: Scale },
      { title: "Integridade e Salvaguardas", url: "/integridade", icon: Building2 },
      { title: "Auditorias", url: "/auditorias", icon: Search },
    ],
  },
  {
    label: "Plataforma",
    items: [
      { title: "Plataforma Green Ledger", url: "/plataforma", icon: Monitor },
      { title: "Registro de Projetos", url: "/registro", icon: FolderKanban },
      { title: "Marketplace de Créditos", url: "/marketplace", icon: Store },
      { title: "Transparência", url: "/transparencia", icon: Eye },
    ],
  },
  {
    label: "Institucional",
    items: [
      { title: "Sobre a Green Ledger", url: "/sobre", icon: Info },
      { title: "Central de Materiais", url: "/materiais", icon: FileText },
      { title: "Notícias", url: "/noticias", icon: Newspaper },
      { title: "Contato", url: "/contato", icon: Mail },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Green Ledger"
            className="h-8 w-auto max-w-[160px] object-contain brightness-0 invert group-data-[collapsible=icon]:hidden"
          />
          <span className="hidden group-data-[collapsible=icon]:block font-heading font-bold text-sidebar-foreground text-lg">
            GL
          </span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-1 pt-2">
        {/* Home link */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={location.pathname === "/"} tooltip="Início">
                <NavLink to="/" end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>Início</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="uppercase tracking-widest text-[10px] font-heading font-semibold text-sidebar-foreground/50">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      tooltip={item.title}
                    >
                      <NavLink
                        to={item.url}
                        className="hover:bg-sidebar-accent/50"
                        activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-3">
        <a
          href="https://app.greenledger.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group-data-[collapsible=icon]:hidden"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 border-sidebar-primary text-sidebar-primary hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
          >
            <ExternalLink className="w-4 h-4" />
            Área do Cliente
          </Button>
        </a>
        <a
          href="https://app.greenledger.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden group-data-[collapsible=icon]:flex items-center justify-center"
        >
          <ExternalLink className="w-4 h-4 text-sidebar-primary" />
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
