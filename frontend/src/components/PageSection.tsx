import type { ReactNode } from "react";

type PageSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

const PageSection = ({ title, description, action, children }: PageSectionProps) => {
  return (
    <section className="section">
      <header className="section__header">
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        {action && <div className="section__action">{action}</div>}
      </header>
      <div className="section__body">{children}</div>
    </section>
  );
};

export default PageSection;

