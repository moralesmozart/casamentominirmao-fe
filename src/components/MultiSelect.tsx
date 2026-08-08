interface MultiSelectProps {
  label: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  hint?: string;
}

export function MultiSelect({
  label,
  options,
  values,
  onChange,
  hint,
}: MultiSelectProps) {
  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((item) => item !== option));
      return;
    }
    onChange([...values, option]);
  };

  return (
    <fieldset className="field">
      <legend className="field__label">{label}</legend>
      {hint ? <p className="field__hint">{hint}</p> : null}
      <div className="chip-group" role="group">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              className={`chip ${selected ? 'chip--selected' : ''}`}
              aria-pressed={selected}
              onClick={() => toggle(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
