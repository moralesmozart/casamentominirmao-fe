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

export function SectionSeven({
  answers,
  onChange,
  onBack,
  onNext,
  onSave,
  saveStatus,
}: Props) {
  const mini = answers.miniIrmao;
  const set = (key: keyof CeremonyAnswers['miniIrmao']) => (value: string) =>
    onChange((prev) => ({
      ...prev,
      miniIrmao: { ...prev.miniIrmao, [key]: value },
    }));

  return (
    <QuestionSection
      number={7}
      total={8}
      label="Arquivo Mini Irmão"
      title="O Arquivo Mini Irmão ❤️"
      subtitle="20 anos de história. Algumas coisas eu já sei. Outras quero lembrar."
      variant="intimate"
      intro={
        <p>
          A Paula entrou na minha vida quando tinha 12 anos. Desde então, acompanhei boa
          parte da história dela — primeiro como namorado da Amanda, depois como marido, e
          em algum momento simplesmente virei irmão.
        </p>
      }
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
        id="first-memory"
        label="Qual é a primeira lembrança que vocês têm de mim?"
        value={mini.firstMemory}
        onChange={set('firstMemory')}
      />
      <TextQuestion
        id="important-story"
        label="Qual é uma história minha com a Paula que vocês acham que deveria entrar na cerimônia?"
        value={mini.importantStory}
        onChange={set('importantStory')}
      />
      <TextQuestion
        id="relationship-description"
        label="Como vocês descreveriam minha relação com a Paula?"
        value={mini.relationshipDescription}
        onChange={set('relationshipDescription')}
      />
      <TextQuestion
        id="twenty-year"
        label="Existe alguma história dos nossos 20 anos que vocês acham especialmente bonita ou engraçada?"
        value={mini.twentyYearStory}
        onChange={set('twentyYearStory')}
      />
    </QuestionSection>
  );
}
