import type { CeremonyAnswers } from '../../types/form';
import { Navigation } from '../Navigation';
import { PeopleInput } from '../PeopleInput';
import { QuestionSection } from '../QuestionSection';
import { SpeakersInput } from '../SpeakersInput';
import { TextQuestion } from '../TextQuestion';

interface Props {
  answers: CeremonyAnswers;
  onChange: (updater: (prev: CeremonyAnswers) => CeremonyAnswers) => void;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
  saveStatus: 'idle' | 'saving' | 'saved';
}

export function SectionFour({
  answers,
  onChange,
  onBack,
  onNext,
  onSave,
  saveStatus,
}: Props) {
  const people = answers.importantPeople;

  return (
    <QuestionSection
      number={4}
      total={8}
      label="Pessoas importantes"
      title="Nenhuma história é construída sozinha."
      footer={
        <Navigation
          onBack={onBack}
          onNext={onNext}
          onSave={onSave}
          saveStatus={saveStatus}
        />
      }
    >
      <PeopleInput
        people={people.people}
        onChange={(next) =>
          onChange((prev) => ({
            ...prev,
            importantPeople: { ...prev.importantPeople, people: next },
          }))
        }
      />
      <TextQuestion
        id="special-mentions"
        label="Existe alguém que vocês gostariam que fosse mencionado especialmente durante a cerimônia?"
        value={people.specialMentions}
        onChange={(value) =>
          onChange((prev) => ({
            ...prev,
            importantPeople: { ...prev.importantPeople, specialMentions: value },
          }))
        }
      />
      <TextQuestion
        id="absent"
        label="Existe alguém que não poderá estar presente, mas que deveria ser lembrado?"
        value={people.absentPeople}
        onChange={(value) =>
          onChange((prev) => ({
            ...prev,
            importantPeople: { ...prev.importantPeople, absentPeople: value },
          }))
        }
      />
      <SpeakersInput
        speakers={people.speakers}
        onChange={(next) =>
          onChange((prev) => ({
            ...prev,
            importantPeople: { ...prev.importantPeople, speakers: next },
          }))
        }
      />
    </QuestionSection>
  );
}
