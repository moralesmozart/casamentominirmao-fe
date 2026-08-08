interface ProgressBarProps {
  number: number;
  total: number;
  label: string;
}

export function ProgressBar({ number, total, label }: ProgressBarProps) {
  const percent = Math.round((number / total) * 100);

  return (
    <div className="progress" aria-label={`Capítulo ${number} de ${total}: ${label}`}>
      <div className="progress__meta">
        <span className="progress__chapter">
          {String(number).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className="progress__label">{label}</span>
      </div>
      <div className="progress__track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
