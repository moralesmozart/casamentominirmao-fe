import type { CeremonyAnswers, DualAnswer } from '../../types/form';
import { DualTextQuestion } from '../DualTextQuestion';
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

export function SectionTwo({
  answers,
  onChange,
  onBack,
  onNext,
  onSave,
  saveStatus,
}: Props) {
  const admiration = answers.admiration;

  const setDual =
    (key: keyof Pick<
      CeremonyAnswers['admiration'],
      'admire' | 'beautifulActions' | 'qualities' | 'annoyingTraits' | 'threeWords'
    >) =>
    (side: keyof DualAnswer, value: string) =>
      onChange((prev) => ({
        ...prev,
        admiration: {
          ...prev.admiration,
          [key]: { ...prev.admiration[key], [side]: value },
        },
      }));

  return (
    <QuestionSection
      number={2}
      total={8}
      label="Um no outro"
      title="Agora quero saber o que vocês veem um no outro."
      footer={
        <Navigation
          onBack={onBack}
          onNext={onNext}
          onSave={onSave}
          saveStatus={saveStatus}
        />
      }
    >
      <DualTextQuestion
        id="admire"
        label="O que você mais admira no outro?"
        paulaValue={admiration.admire.paulaAboutFelipe}
        felipeValue={admiration.admire.felipeAboutPaula}
        onPaulaChange={(value) => setDual('admire')('paulaAboutFelipe', value)}
        onFelipeChange={(value) => setDual('admire')('felipeAboutPaula', value)}
      />
      <DualTextQuestion
        id="beautiful"
        label="Qual é a coisa mais bonita que o outro faz por você?"
        paulaValue={admiration.beautifulActions.paulaAboutFelipe}
        felipeValue={admiration.beautifulActions.felipeAboutPaula}
        onPaulaChange={(value) => setDual('beautifulActions')('paulaAboutFelipe', value)}
        onFelipeChange={(value) => setDual('beautifulActions')('felipeAboutPaula', value)}
      />
      <DualTextQuestion
        id="qualities"
        label="Qual é a maior qualidade do outro?"
        paulaValue={admiration.qualities.paulaAboutFelipe}
        felipeValue={admiration.qualities.felipeAboutPaula}
        onPaulaChange={(value) => setDual('qualities')('paulaAboutFelipe', value)}
        onFelipeChange={(value) => setDual('qualities')('felipeAboutPaula', value)}
      />
      <DualTextQuestion
        id="annoying"
        label="Qual é aquela característica do outro que às vezes te enlouquece? 😂"
        paulaValue={admiration.annoyingTraits.paulaAboutFelipe}
        felipeValue={admiration.annoyingTraits.felipeAboutPaula}
        onPaulaChange={(value) => setDual('annoyingTraits')('paulaAboutFelipe', value)}
        onFelipeChange={(value) => setDual('annoyingTraits')('felipeAboutPaula', value)}
      />
      <TextQuestion
        id="lessons"
        label="O que vocês aprenderam um com o outro?"
        value={admiration.lessons}
        onChange={(value) =>
          onChange((prev) => ({
            ...prev,
            admiration: { ...prev.admiration, lessons: value },
          }))
        }
      />
      <DualTextQuestion
        id="three-words"
        label="Se você tivesse que descrever seu parceiro em 3 palavras, quais seriam?"
        paulaValue={admiration.threeWords.paulaAboutFelipe}
        felipeValue={admiration.threeWords.felipeAboutPaula}
        onPaulaChange={(value) => setDual('threeWords')('paulaAboutFelipe', value)}
        onFelipeChange={(value) => setDual('threeWords')('felipeAboutPaula', value)}
        rows={2}
        placeholderPaula="ex.: inteligente, generoso, insistente"
        placeholderFelipe="ex.: brilhante, determinada, previsora"
      />
    </QuestionSection>
  );
}
