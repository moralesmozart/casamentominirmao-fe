interface SingleSelectProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

export function SingleSelect({
  label,
  name,
  options,
  value,
  onChange,
  hint,
}: SingleSelectProps) {
  return (
    <fieldset className="field">
      <legend className="field__label">{label}</legend>
      {hint ? <p className="field__hint">{hint}</p> : null}
      <div className="radio-group">
        {options.map((option) => {
          const id = `${name}-${option}`;
          return (
            <label key={option} className={`radio ${value === option ? 'radio--selected' : ''}`} htmlFor={id}>
              <input
                id={id}
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
