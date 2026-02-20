import SectionHeading from "@/components/SectionHeading";

const PublicConsultations = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <SectionHeading
          title="Consultas Públicas"
          description="Participe dos processos de consulta pública para desenvolvimento e revisão de metodologias e padrões."
        />
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg">
            Esta seção está em construção. Em breve você poderá acessar as consultas públicas abertas e encerradas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicConsultations;
