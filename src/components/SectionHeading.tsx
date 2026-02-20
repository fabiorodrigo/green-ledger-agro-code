interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

const SectionHeading = ({ tag, title, description, centered = true }: SectionHeadingProps) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    {tag && (
      <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 rounded-full mb-4">
        {tag}
      </span>
    )}
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-balance">{title}</h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed mx-auto">{description}</p>
    )}
  </div>
);

export default SectionHeading;
