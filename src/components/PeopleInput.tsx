import type { PersonEntry } from '../types/form';
import { createId } from '../utils/id';

interface PeopleInputProps {
  people: PersonEntry[];
  onChange: (people: PersonEntry[]) => void;
}

export function PeopleInput({ people, onChange }: PeopleInputProps) {
  const addPerson = () => {
    onChange([
      ...people,
      { id: createId(), name: '', relationship: '', whyImportant: '' },
    ]);
  };

  const updatePerson = (id: string, patch: Partial<PersonEntry>) => {
    onChange(people.map((person) => (person.id === id ? { ...person, ...patch } : person)));
  };

  const removePerson = (id: string) => {
    onChange(people.filter((person) => person.id !== id));
  };

  return (
    <div className="field">
      <div className="field__label-row">
        <p className="field__label">Quem são as pessoas que precisam fazer parte dessa história?</p>
        <button type="button" className="btn btn--ghost btn--small" onClick={addPerson}>
          + Adicionar pessoa
        </button>
      </div>
      <p className="field__hint">
        Pais, irmãos, avós, amigos, padrinhos, ou quem teve um papel importante na relação de vocês.
      </p>

      {people.length === 0 ? (
        <button type="button" className="empty-add" onClick={addPerson}>
          Começar a listar pessoas importantes
        </button>
      ) : (
        <div className="entry-list">
          {people.map((person, index) => (
            <div key={person.id} className="entry-card">
              <div className="entry-card__header">
                <span>Pessoa {index + 1}</span>
                <button
                  type="button"
                  className="btn btn--text"
                  onClick={() => removePerson(person.id)}
                >
                  Remover
                </button>
              </div>
              <label className="sr-only" htmlFor={`${person.id}-name`}>
                Nome
              </label>
              <input
                id={`${person.id}-name`}
                className="field__input"
                placeholder="Nome"
                value={person.name}
                onChange={(event) => updatePerson(person.id, { name: event.target.value })}
              />
              <label className="sr-only" htmlFor={`${person.id}-relationship`}>
                Relação
              </label>
              <input
                id={`${person.id}-relationship`}
                className="field__input"
                placeholder="Relação (ex.: irmã, padrinho, amiga de infância)"
                value={person.relationship}
                onChange={(event) =>
                  updatePerson(person.id, { relationship: event.target.value })
                }
              />
              <label className="sr-only" htmlFor={`${person.id}-why`}>
                Por que é importante
              </label>
              <textarea
                id={`${person.id}-why`}
                className="field__textarea"
                rows={3}
                placeholder="Por que essa pessoa é importante nessa história?"
                value={person.whyImportant}
                onChange={(event) =>
                  updatePerson(person.id, { whyImportant: event.target.value })
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
