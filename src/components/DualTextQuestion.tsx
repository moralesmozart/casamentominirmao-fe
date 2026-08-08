interface DualTextQuestionProps {
  id: string;
  label: string;
  paulaValue: string;
  felipeValue: string;
  onPaulaChange: (value: string) => void;
  onFelipeChange: (value: string) => void;
  placeholderPaula?: string;
  placeholderFelipe?: string;
  rows?: number;
}

export function DualTextQuestion({
  id,
  label,
  paulaValue,
  felipeValue,
  onPaulaChange,
  onFelipeChange,
  placeholderPaula = 'Paula → Felipe',
  placeholderFelipe = 'Felipe → Paula',
  rows = 3,
}: DualTextQuestionProps) {
  return (
    <fieldset className="field field--dual">
      <legend className="field__label">{label}</legend>
      <div className="dual-grid">
        <div className="dual-card">
          <label className="dual-card__label" htmlFor={`${id}-paula`}>
            Paula → Felipe
          </label>
          <textarea
            id={`${id}-paula`}
            className="field__textarea"
            value={paulaValue}
            onChange={(event) => onPaulaChange(event.target.value)}
            placeholder={placeholderPaula}
            rows={rows}
          />
        </div>
        <div className="dual-card">
          <label className="dual-card__label" htmlFor={`${id}-felipe`}>
            Felipe → Paula
          </label>
          <textarea
            id={`${id}-felipe`}
            className="field__textarea"
            value={felipeValue}
            onChange={(event) => onFelipeChange(event.target.value)}
            placeholder={placeholderFelipe}
            rows={rows}
          />
        </div>
      </div>
    </fieldset>
  );
}
