interface TextQuestionProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
  showCount?: boolean;
}

export function TextQuestion({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows = 5,
  showCount = false,
}: TextQuestionProps) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {hint ? <p className="field__hint">{hint}</p> : null}
      <textarea
        id={id}
        className="field__textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
      {showCount ? (
        <span className="field__count">{value.trim().length} caracteres</span>
      ) : null}
    </div>
  );
}
