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

export function SectionSix({
  answers,
  onChange,
  onBack,
  onNext,
  onSave,
  saveStatus,
}: Props) {
  const funny = answers.funnyStories;
  const set = (key: keyof CeremonyAnswers['funnyStories']) => (value: string) =>
    onChange((prev) => ({
      ...prev,
      funnyStories: { ...prev.funnyStories, [key]: value },
    }));

  return (
    <QuestionSection
      number={6}
      total={8}
      label="Material secreto"
      title="Agora vem a parte perigosa."
      subtitle="Histórias que podem transformar um discurso bom em um discurso inesquecível."
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
        id="funny-couple"
        label="Qual é a história mais engraçada de vocês?"
        value={funny.coupleStory}
        onChange={set('coupleStory')}
      />
      <TextQuestion
        id="absurd"
        label="Qual é a situação mais absurda que vocês já viveram juntos?"
        value={funny.absurdStory}
        onChange={set('absurdStory')}
      />
      <TextQuestion
        id="paula-story"
        label="Qual história sobre a Paula eu PRECISO conhecer?"
        value={funny.paulaStory}
        onChange={set('paulaStory')}
      />
      <TextQuestion
        id="felipe-story"
        label="Qual história sobre o Felipe eu PRECISO conhecer?"
        value={funny.felipeStory}
        onChange={set('felipeStory')}
      />
      <TextQuestion
        id="forbidden"
        label="Existe alguma história que vocês NÃO querem que eu conte?"
        value={funny.forbiddenStories}
        onChange={set('forbiddenStories')}
        hint="Esta resposta será tratada com absoluto sigilo. Provavelmente. 😂"
      />
      <TextQuestion
        id="inside-jokes"
        label="Tem alguma piada interna, apelido ou história que só os amigos e família entendem?"
        value={funny.insideJokes}
        onChange={set('insideJokes')}
      />
    </QuestionSection>
  );
}
