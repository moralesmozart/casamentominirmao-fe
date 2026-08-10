import { useCallback, useEffect, useRef, useState } from 'react';
import { createEmptyAnswers } from '../data/initialForm';
import { submitCeremonyToSupabase } from '../lib/submitToSupabase';
import { isSupabaseConfigured } from '../lib/supabase';
import { normalizeStep } from '../data/steps';
import type { AppStep, CeremonyAnswers, PersistedState } from '../types/form';
import { STORAGE_KEY } from '../types/form';

function normalizeAnswers(answers: CeremonyAnswers): CeremonyAnswers {
  return {
    ...answers,
    uploads: {
      files: answers.uploads?.files ?? [],
      audios: answers.uploads?.audios ?? [],
      links: answers.uploads?.links ?? '',
    },
  };
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useCeremonyForm() {
  const initial = loadState();
  const [step, setStep] = useState<AppStep>(normalizeStep(initial?.step));
  const [answers, setAnswers] = useState<CeremonyAnswers>(
    normalizeAnswers(initial?.answers ?? createEmptyAnswers()),
  );
  const [submittedAt, setSubmittedAt] = useState<string | null>(
    initial?.submittedAt ?? null,
  );
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
    'idle',
  );
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'error'
  >('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const saveTimer = useRef<number | null>(null);
  const statusTimer = useRef<number | null>(null);

  const persist = useCallback(
    (next: Partial<PersistedState> & { answers?: CeremonyAnswers; step?: AppStep }) => {
      const payload: PersistedState = {
        version: 1,
        step: next.step ?? step,
        answers: next.answers ?? answers,
        submittedAt:
          next.submittedAt !== undefined ? next.submittedAt : submittedAt,
        updatedAt: new Date().toISOString(),
      };
      setSaveStatus('saving');
      saveState(payload);
      if (statusTimer.current) window.clearTimeout(statusTimer.current);
      statusTimer.current = window.setTimeout(() => setSaveStatus('saved'), 280);
    },
    [answers, step, submittedAt],
  );

  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      persist({});
    }, 450);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [answers, step, submittedAt, persist]);

  const updateAnswers = useCallback(
    (updater: (prev: CeremonyAnswers) => CeremonyAnswers) => {
      setAnswers((prev) => updater(prev));
    },
    [],
  );

  const goTo = useCallback((next: AppStep) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const saveNow = useCallback(() => {
    persist({});
  }, [persist]);

  const submit = useCallback(async () => {
    setSubmitStatus('submitting');
    setSubmitError(null);

    try {
      if (!isSupabaseConfigured) {
        throw new Error(
          'Envio ainda não está configurado neste ambiente. Avise quem montou o site.',
        );
      }

      await submitCeremonyToSupabase(answers);

      const now = new Date().toISOString();
      setSubmittedAt(now);
      setSubmitStatus('idle');
      goTo('complete');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar. Tentem de novo em instantes.';
      setSubmitStatus('error');
      setSubmitError(message);
    }
  }, [answers, goTo]);

  const resetToStart = useCallback(() => {
    goTo('hero');
  }, [goTo]);

  return {
    step,
    answers,
    submittedAt,
    saveStatus,
    submitStatus,
    submitError,
    isCloudEnabled: isSupabaseConfigured,
    updateAnswers,
    goTo,
    saveNow,
    submit,
    resetToStart,
  };
}
