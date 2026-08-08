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

export function SectionEight({
  answers,
  onChange,
  onBack,
  onNext,
  onSave,
  saveStatus,
}: Props) {
  const final = answers.final;

  return (
    <QuestionSection
      number={4}
      total={4}
      label="Última pergunta"
      title="Última pergunta. Prometo."
      footer={
        <Navigation
          onBack={onBack}
          onNext={onNext}
          onSave={onSave}
          saveStatus={saveStatus}
          nextLabel="Quase lá"
        />
      }
    >
      <TextQuestion
        id="message-guests"
        label="Se vocês pudessem escolher uma única mensagem para os convidados levarem para casa depois da cerimônia, qual seria?"
        value={final.messageToGuests}
        onChange={(value) =>
          onChange((prev) => ({
            ...prev,
            final: { ...prev.final, messageToGuests: value },
          }))
        }
        rows={5}
      />
    </QuestionSection>
  );
}
