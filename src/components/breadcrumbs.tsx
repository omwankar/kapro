export type Crumb = {
  name: string;
  path?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  light?: boolean;
};

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="seo-breadcrumbs">
      <ol
        className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px] ${
          light ? "text-[#FBF3EE]/80" : "text-muted-foreground"
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.path && !isLast ? (
                <a
                  href={item.path}
                  className={light ? "transition-colors hover:text-[#FBF3EE]" : "transition-colors hover:text-ink"}
                >
                  {item.name}
                </a>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
