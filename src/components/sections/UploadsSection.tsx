import type { CeremonyAnswers } from '../../types/form';
import { AudioRecorder } from '../AudioRecorder';
import { FileUpload } from '../FileUpload';
import { Navigation } from '../Navigation';
import { QuestionSection } from '../QuestionSection';
import { TextQuestion } from '../TextQuestion';

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
      number={9}
      total={9}
      label="Arquivos extras"
      title="Se quiserem deixar tudo ainda melhor…"
      subtitle="Opcional — só se tiverem vontade."
      intro={
        <p>
          Fotos antigas, prints, vídeos, áudios, músicas — qualquer coisa que ajude a contar a
          história de vocês. Se for mais fácil falar do que escrever, gravem um áudio.
        </p>
      }
      footer={
        <>
          {submitError ? <p className="field__error">{submitError}</p> : null}
          <p className="submit-hint">
            {isCloudEnabled
              ? 'Ao enviar, as respostas e os áudios vão direto para o Mozart.'
              : 'Envio na nuvem ainda não configurado — por enquanto as respostas ficam neste aparelho.'}
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
      <FileUpload
        files={answers.uploads.files}
        onChange={(files) =>
          onChange((prev) => ({
            ...prev,
            uploads: { ...prev.uploads, files },
          }))
        }
      />
      <TextQuestion
        id="links"
        label="Links de músicas, playlists, pastas ou referências"
        value={answers.uploads.links}
        onChange={(links) =>
          onChange((prev) => ({
            ...prev,
            uploads: { ...prev.uploads, links },
          }))
        }
        placeholder="Spotify, Drive, YouTube, Pinterest…"
        rows={3}
      />
    </QuestionSection>
  );
}
