import SectionHeading from "@/components/SectionHeading";

const About = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <SectionHeading
          title="Sobre a Green Ledger"
          description="Conheça nossa missão, visão e valores na construção de um padrão de certificação de carbono robusto e transparente."
        />
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg">
            Esta seção está em construção. Em breve você poderá conhecer mais sobre a Green Ledger.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
