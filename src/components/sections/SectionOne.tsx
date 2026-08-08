import type { CeremonyAnswers } from '../../types/form';
import { Navigation } from '../Navigation';
import { QuestionSection } from '../QuestionSection';
import { TextQuestion } from '../TextQuestion';

interface Props {
  answers: CeremonyAnswers;
  onChange: (updater: (prev: CeremonyAnswers) => CeremonyAnswers) => void;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
  saveStatus: 'idle' | 'saving' | 'saved';
}

export function SectionOne({
  answers,
  onChange,
  onBack,
  onNext,
  onSave,
  saveStatus,
}: Props) {
  const story = answers.relationshipStory;

  const set =
    (key: keyof CeremonyAnswers['relationshipStory']) => (value: string) =>
      onChange((prev) => ({
        ...prev,
        relationshipStory: { ...prev.relationshipStory, [key]: value },
      }));

  return (
    <QuestionSection
      number={1}
      total={4}
      label="Vocês dois"
      title="Comecemos pela história de vocês."
      subtitle="Quero entender o que fez essa história chegar até aqui."
      footer={
        <Navigation
          onBack={onBack}
          onNext={onNext}
          onSave={onSave}
          saveStatus={saveStatus}
        />
      }
    >
      <TextQuestion
        id="how-we-met"
        label="Como vocês se conheceram?"
        value={story.howWeMet}
        onChange={set('howWeMet')}
        placeholder="Pode contar a versão oficial, a versão verdadeira ou as duas…"
        rows={6}
      />
      <TextQuestion
        id="when-special"
        label="Quando vocês perceberam que isso era diferente?"
        value={story.whenItBecameSpecial}
        onChange={set('whenItBecameSpecial')}
      />
      <TextQuestion
        id="first-moment"
        label="Qual foi o primeiro momento em que vocês pensaram: “é essa pessoa”?"
        value={story.firstMoment}
        onChange={set('firstMoment')}
      />
    </QuestionSection>
  );
}
