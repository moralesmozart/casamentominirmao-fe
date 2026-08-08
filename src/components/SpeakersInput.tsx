import type { SpeakerEntry } from '../types/form';
import { createId } from '../utils/id';

interface SpeakersInputProps {
  speakers: SpeakerEntry[];
  onChange: (speakers: SpeakerEntry[]) => void;
}

export function SpeakersInput({ speakers, onChange }: SpeakersInputProps) {
  const addSpeaker = () => {
    onChange([
      ...speakers,
      { id: createId(), name: '', relationship: '', participation: '' },
    ]);
  };

  const updateSpeaker = (id: string, patch: Partial<SpeakerEntry>) => {
    onChange(
      speakers.map((speaker) => (speaker.id === id ? { ...speaker, ...patch } : speaker)),
    );
  };

  const removeSpeaker = (id: string) => {
    onChange(speakers.filter((speaker) => speaker.id !== id));
  };

  return (
    <div className="field">
      <div className="field__label-row">
        <p className="field__label">Alguém fará um discurso ou uma homenagem?</p>
        <button type="button" className="btn btn--ghost btn--small" onClick={addSpeaker}>
          + Adicionar
        </button>
      </div>

      {speakers.length === 0 ? (
        <button type="button" className="empty-add" onClick={addSpeaker}>
          Adicionar quem vai falar ou homenagear
        </button>
      ) : (
        <div className="entry-list">
          {speakers.map((speaker, index) => (
            <div key={speaker.id} className="entry-card">
              <div className="entry-card__header">
                <span>Participação {index + 1}</span>
                <button
                  type="button"
                  className="btn btn--text"
                  onClick={() => removeSpeaker(speaker.id)}
                >
                  Remover
                </button>
              </div>
              <input
                className="field__input"
                placeholder="Nome"
                value={speaker.name}
                onChange={(event) => updateSpeaker(speaker.id, { name: event.target.value })}
                aria-label={`Nome da participação ${index + 1}`}
              />
              <input
                className="field__input"
                placeholder="Relação"
                value={speaker.relationship}
                onChange={(event) =>
                  updateSpeaker(speaker.id, { relationship: event.target.value })
                }
                aria-label={`Relação da participação ${index + 1}`}
              />
              <input
                className="field__input"
                placeholder="Tipo de participação (discurso, música, leitura…)"
                value={speaker.participation}
                onChange={(event) =>
                  updateSpeaker(speaker.id, { participation: event.target.value })
                }
                aria-label={`Tipo de participação ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
