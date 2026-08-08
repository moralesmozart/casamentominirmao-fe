import { useEffect } from 'react';
import { CompletionScreen } from './components/CompletionScreen';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { SectionEight } from './components/sections/SectionEight';
import { SectionFive } from './components/sections/SectionFive';
import { SectionFour } from './components/sections/SectionFour';
import { SectionOne } from './components/sections/SectionOne';
import { SectionSeven } from './components/sections/SectionSeven';
import { SectionSix } from './components/sections/SectionSix';
import { SectionThree } from './components/sections/SectionThree';
import { SectionTwo } from './components/sections/SectionTwo';
import { UploadsSection } from './components/sections/UploadsSection';
import { getNextStep, getPrevStep } from './data/steps';
import { useCeremonyForm } from './hooks/useCeremonyForm';

function App() {
  const {
    step,
    answers,
    saveStatus,
    submitStatus,
    submitError,
    isCloudEnabled,
    updateAnswers,
    goTo,
    saveNow,
    submit,
    resetToStart,
  } = useCeremonyForm();

  useEffect(() => {
    document.body.dataset.step = step;
  }, [step]);

  const sectionProps = {
    answers,
    onChange: updateAnswers,
    onBack: () => {
      const prev = getPrevStep(step);
      if (prev) goTo(prev);
    },
    onNext: () => {
      const next = getNextStep(step);
      if (next) goTo(next);
    },
    onSave: saveNow,
    saveStatus,
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Ir para o conteúdo
      </a>
      <main id="main" key={step} className="stage">
        {step === 'hero' ? <Hero onStart={() => goTo('intro')} /> : null}
        {step === 'intro' ? (
          <Intro onContinue={() => goTo('section-1')} onBack={() => goTo('hero')} />
        ) : null}
        {step === 'section-1' ? <SectionOne {...sectionProps} /> : null}
        {step === 'section-2' ? <SectionTwo {...sectionProps} /> : null}
        {step === 'section-3' ? <SectionThree {...sectionProps} /> : null}
        {step === 'section-4' ? <SectionFour {...sectionProps} /> : null}
        {step === 'section-5' ? <SectionFive {...sectionProps} /> : null}
        {step === 'section-6' ? <SectionSix {...sectionProps} /> : null}
        {step === 'section-7' ? <SectionSeven {...sectionProps} /> : null}
        {step === 'section-8' ? <SectionEight {...sectionProps} /> : null}
        {step === 'uploads' ? (
          <UploadsSection
            answers={answers}
            onChange={updateAnswers}
            onBack={() => goTo('section-8')}
            onSubmit={() => {
              void submit();
            }}
            onSave={saveNow}
            saveStatus={saveStatus}
            submitStatus={submitStatus}
            submitError={submitError}
            isCloudEnabled={isCloudEnabled}
          />
        ) : null}
        {step === 'complete' ? (
          <CompletionScreen onRestart={resetToStart} isCloudEnabled={isCloudEnabled} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
