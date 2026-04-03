interface SectionEmptyStateProps {
  title: string;
  description: string;
}

const SectionEmptyState = ({ title, description }: SectionEmptyStateProps) => {
  return (
    <div
      role="status"
      className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/60 px-6 py-10 text-center shadow-[var(--shadow-card)]"
    >
      <p className="text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default SectionEmptyState;