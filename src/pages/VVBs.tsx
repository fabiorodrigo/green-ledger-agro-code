import SectionHeading from "@/components/SectionHeading";

const VVBs = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <SectionHeading
          title="Organismos de Validação e Verificação (VVBs)"
          description="Conheça os organismos credenciados para validar e verificar projetos no padrão Green Ledger."
        />
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg">
            Esta seção está em construção. Em breve você poderá consultar a lista de VVBs credenciados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VVBs;
