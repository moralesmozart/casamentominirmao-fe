interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__top">
        <p className="hero__kicker">Mestre de cerimônia · Mozart Morales</p>
        <div className="hero__ornament" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="hero__content">
        <h1 id="hero-title">Casamento Mini Irmão &amp; Fê</h1>
        <p className="hero__names">Paula Velasco &amp; Felipe Lenzi Rocha</p>
        <p className="hero__line">“20 anos de Mini Irmão. Agora chegou a vez de casar.”</p>
        <p className="hero__secondary">
          Um pequeno questionário para ajudar a contar uma grande história.
        </p>
        <button type="button" className="btn btn--primary btn--large" onClick={onStart}>
          Começar
        </button>
      </div>
    </section>
  );
}
