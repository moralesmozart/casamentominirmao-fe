interface NavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  onSave?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  showSave?: boolean;
  saveStatus?: 'idle' | 'saving' | 'saved';
  nextDisabled?: boolean;
  backDisabled?: boolean;
}

export function Navigation({
  onBack,
  onNext,
  onSave,
  nextLabel = 'Próximo',
  showBack = true,
  showSave = true,
  saveStatus = 'idle',
  nextDisabled = false,
  backDisabled = false,
}: NavigationProps) {
  return (
    <div className="nav-row">
      <div className="nav-row__left">
        {showBack && onBack ? (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onBack}
            disabled={backDisabled}
          >
            Anterior
          </button>
        ) : (
          <span />
        )}
      </div>
      <div className="nav-row__right">
        {showSave && onSave ? (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onSave}
            disabled={nextDisabled}
          >
            {saveStatus === 'saving'
              ? 'Salvando…'
              : saveStatus === 'saved'
                ? 'Salvo'
                : 'Salvar progresso'}
          </button>
        ) : null}
        {onNext ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={onNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
