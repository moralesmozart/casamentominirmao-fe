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

export function SectionThree({
  answers,
  onChange,
  onBack,
  onNext,
  onSave,
  saveStatus,
}: Props) {
  const marriage = answers.marriage;
  const set = (key: keyof CeremonyAnswers['marriage']) => (value: string) =>
    onChange((prev) => ({
      ...prev,
      marriage: { ...prev.marriage, [key]: value },
    }));

  return (
    <QuestionSection
      number={3}
      total={8}
      label="Amor e futuro"
      title="E afinal… o que é casamento para vocês?"
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
        id="meaning"
        label="O que casamento significa para vocês?"
        value={marriage.meaning}
        onChange={set('meaning')}
      />
      <TextQuestion
        id="lasting"
        label="O que vocês acreditam que faz um relacionamento durar?"
        value={marriage.lastingRelationship}
        onChange={set('lastingRelationship')}
      />
      <TextQuestion
        id="build"
        label="O que vocês querem construir juntos?"
        value={marriage.buildTogether}
        onChange={set('buildTogether')}
      />
      <TextQuestion
        id="ten-years"
        label="Onde vocês se imaginam daqui a 10 anos?"
        value={marriage.future10Years}
        onChange={set('future10Years')}
      />
      <TextQuestion
        id="fifty-years"
        label="E daqui a 50?"
        value={marriage.future50Years}
        onChange={set('future50Years')}
      />
      <TextQuestion
        id="inspirations"
        label="Existe alguma frase, música, livro, filme ou ideia que representa o relacionamento de vocês?"
        value={marriage.inspirations}
        onChange={set('inspirations')}
      />
    </QuestionSection>
  );
}
