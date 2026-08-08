import type { CeremonyAnswers } from '../../types/form';
import { AudioRecorder } from '../AudioRecorder';
import { Navigation } from '../Navigation';
import { QuestionSection } from '../QuestionSection';

interface Props {
  answers: CeremonyAnswers;
  onChange: (updater: (prev: CeremonyAnswers) => CeremonyAnswers) => void;
  onBack: () => void;
  onSubmit: () => void;
  onSave: () => void;
  saveStatus: 'idle' | 'saving' | 'saved';
  submitStatus?: 'idle' | 'submitting' | 'error';
  submitError?: string | null;
  isCloudEnabled?: boolean;
}

export function UploadsSection({
  answers,
  onChange,
  onBack,
  onSubmit,
  onSave,
  saveStatus,
  submitStatus = 'idle',
  submitError = null,
  isCloudEnabled = false,
}: Props) {
  const submitting = submitStatus === 'submitting';

  return (
    <QuestionSection
      number={5}
      total={5}
      label="Áudios"
      title="Se quiserem deixar tudo ainda melhor…"
      subtitle="Opcional — só se tiverem vontade."
      intro={
        <p>
          Se for mais fácil falar do que escrever, gravem um áudio contando uma história ou um
          detalhe importante.
        </p>
      }
      footer={
        <>
          {submitError ? <p className="field__error">{submitError}</p> : null}
          <p className="submit-hint">
            {isCloudEnabled
              ? 'Ao enviar, as respostas chegam com segurança para quem está preparando a cerimônia.'
              : 'Envio ainda não está disponível neste ambiente.'}
          </p>
          <Navigation
            onBack={onBack}
            onNext={onSubmit}
            onSave={onSave}
            saveStatus={saveStatus}
            nextLabel={submitting ? 'Enviando…' : 'Enviar história'}
            nextDisabled={submitting}
            backDisabled={submitting}
          />
        </>
      }
    >
      <AudioRecorder
        audios={answers.uploads.audios ?? []}
        onChange={(audios) =>
          onChange((prev) => ({
            ...prev,
            uploads: { ...prev.uploads, audios },
          }))
        }
      />
    </QuestionSection>
  );
}
