interface CompletionScreenProps {
  onRestart: () => void;
  isCloudEnabled?: boolean;
}

export function CompletionScreen({
  onRestart,
  isCloudEnabled = false,
}: CompletionScreenProps) {
  return (
    <section className="complete" aria-labelledby="complete-title">
      <div className="complete__card">
        <p className="eyebrow">Pronto</p>
        <h2 id="complete-title">História recebida. ❤️</h2>
        <div className="complete__copy">
          <p>Agora eu tenho o que precisava.</p>
          <p>
            Vou juntar tudo isso com os quase 20 anos de histórias que já carrego comigo e
            transformar em uma cerimônia que seja realmente de vocês.
          </p>
          <p>
            Paula, minha Mini Irmão.
            <br />
            Fê, prepare-se.
          </p>
          <p className="complete__closing">Temos uma história para contar.</p>
        </div>
        <p className="complete__note">
          {isCloudEnabled
            ? 'As respostas (e áudios, se houver) já estão salvas com o Mozart. Uma cópia também continua neste navegador.'
            : 'Uma cópia das respostas ficou salva neste navegador.'}
        </p>
        <button type="button" className="btn btn--primary" onClick={onRestart}>
          Voltar ao início
        </button>
      </div>
    </section>
  );
}
