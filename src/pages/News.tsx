import SectionHeading from "@/components/SectionHeading";

const News = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <SectionHeading
          title="Notícias"
          description="Acompanhe as últimas novidades, eventos e atualizações do ecossistema Green Ledger."
        />
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg">
            Esta seção está em construção. Em breve você poderá acompanhar nossas notícias e atualizações.
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
