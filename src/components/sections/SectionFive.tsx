import type { CeremonyAnswers } from '../../types/form';
import { MultiSelect } from '../MultiSelect';
import { Navigation } from '../Navigation';
import { QuestionSection } from '../QuestionSection';
import { SingleSelect } from '../SingleSelect';
import { TextQuestion } from '../TextQuestion';

interface Props {
  answers: CeremonyAnswers;
  onChange: (updater: (prev: CeremonyAnswers) => CeremonyAnswers) => void;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
  saveStatus: 'idle' | 'saving' | 'saved';
}

const TONE_OPTIONS = [
  'Religiosa',
  'Espiritual',
  'Emocional',
  'Divertida',
  'Descontraída',
  'Tradicional',
  'Moderna',
  'Uma mistura de tudo',
];

const RITUAL_OPTIONS = [
  'Votos',
  'Alianças',
  'Cerimônia religiosa',
  'Música',
  'Homenagem',
  'Ritual simbólico',
  'Outro',
];

const RING_OPTIONS = [
  'Criança',
  'Padrinhos',
  'Pais',
  'Pessoa especial',
  'Mestre de cerimônia',
  'Ainda não decidimos',
  'Outro',
];

const SPEECH_OPTIONS = [
  'Sim, teremos votos',
  'Sim, mas ainda não sabemos como',
  'Não',
  'Ainda não decidimos',
];

export function SectionFive({
  answers,
  onChange,
  onBack,
  onNext,
  onSave,
  saveStatus,
}: Props) {
  const ceremony = answers.ceremony;

  const patch = (partial: Partial<CeremonyAnswers['ceremony']>) =>
    onChange((prev) => ({
      ...prev,
      ceremony: { ...prev.ceremony, ...partial },
    }));

  return (
    <QuestionSection
      number={3}
      total={4}
      label="A cerimônia"
      title="Agora vamos falar do grande dia."
      footer={
        <Navigation
          onBack={onBack}
          onNext={onNext}
          onSave={onSave}
          saveStatus={saveStatus}
        />
      }
    >
      <MultiSelect
        label="Que tipo de cerimônia vocês imaginam?"
        options={TONE_OPTIONS}
        values={ceremony.tone}
        onChange={(tone) => patch({ tone })}
        hint="Podem escolher mais de uma."
      />
      <MultiSelect
        label="Haverá algum ritual especial?"
        options={RITUAL_OPTIONS}
        values={ceremony.rituals}
        onChange={(rituals) => patch({ rituals })}
      />
      {ceremony.rituals.includes('Outro') ? (
        <TextQuestion
          id="rituals-other"
          label="Qual outro ritual?"
          value={ceremony.ritualsOther}
          onChange={(ritualsOther) => patch({ ritualsOther })}
          rows={2}
        />
      ) : null}
      <SingleSelect
        label="Como será a entrada das alianças?"
        name="rings"
        options={RING_OPTIONS}
        value={ceremony.rings}
        onChange={(rings) => patch({ rings })}
      />
      {ceremony.rings === 'Outro' || ceremony.rings === 'Pessoa especial' ? (
        <TextQuestion
          id="rings-other"
          label="Quer contar mais detalhes sobre as alianças?"
          value={ceremony.ringsOther}
          onChange={(ringsOther) => patch({ ringsOther })}
          rows={2}
        />
      ) : null}
      <SingleSelect
        label="Vocês terão um momento para falar durante a cerimônia?"
        name="couple-speech"
        options={SPEECH_OPTIONS}
        value={ceremony.coupleSpeech}
        onChange={(coupleSpeech) => patch({ coupleSpeech })}
      />
    </QuestionSection>
  );
}
