interface IntroProps {
  onContinue: () => void;
  onBack: () => void;
}

export function Intro({ onContinue, onBack }: IntroProps) {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro__card">
        <p className="eyebrow">Antes do discurso</p>
        <h2 id="intro-title">Antes de escrever o discurso…</h2>
        <div className="intro__copy">
          <p>Eu poderia simplesmente sentar e escrever algumas palavras bonitas.</p>
          <p>
            Mas depois de conhecer a Paula há quase 20 anos, isso seria fácil demais.
          </p>
          <p>
            Quero contar a história de vocês do jeito que ela merece ser contada: com as
            histórias engraçadas, os momentos importantes, as pessoas que fizeram parte do
            caminho e, principalmente, aquilo que faz vocês serem vocês.
          </p>
          <p>Então preciso da ajuda de vocês.</p>
          <p>
            Não existe resposta certa. Quanto mais histórias, detalhes, nomes, situações
            engraçadas e pequenos detalhes vocês compartilharem, melhor.
          </p>
          <p>
            <strong>Prometo usar tudo isso com responsabilidade.</strong>
          </p>
          <p className="intro__joke">Bom… quase tudo. 😂</p>
        </div>
        <div className="nav-row">
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            Voltar
          </button>
          <button type="button" className="btn btn--primary" onClick={onContinue}>
            Vamos começar
          </button>
        </div>
      </div>
    </section>
  );
}
