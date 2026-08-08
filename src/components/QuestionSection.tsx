import type { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';

interface QuestionSectionProps {
  number: number;
  total: number;
  label: string;
  title: string;
  subtitle?: string;
  intro?: ReactNode;
  variant?: 'default' | 'intimate';
  children: ReactNode;
  footer?: ReactNode;
}

export function QuestionSection({
  number,
  total,
  label,
  title,
  subtitle,
  intro,
  variant = 'default',
  children,
  footer,
}: QuestionSectionProps) {
  return (
    <section className={`chapter chapter--${variant}`} aria-labelledby="chapter-title">
      <div className="chapter__inner">
        <ProgressBar number={number} total={total} label={label} />
        <header className="chapter__header">
          <p className="eyebrow">Capítulo {String(number).padStart(2, '0')}</p>
          <h2 id="chapter-title">{title}</h2>
          {subtitle ? <p className="chapter__subtitle">{subtitle}</p> : null}
          {intro ? <div className="chapter__intro">{intro}</div> : null}
        </header>
        <div className="chapter__body">{children}</div>
        {footer ? <div className="chapter__footer">{footer}</div> : null}
      </div>
    </section>
  );
}
