import type { AppStep } from '../types/form';

export const QUESTION_STEPS: AppStep[] = [
  'section-1',
  'section-4',
  'section-5',
  'section-8',
  'uploads',
];

export const FLOW: AppStep[] = [
  'hero',
  'intro',
  ...QUESTION_STEPS,
  'complete',
];

export const CHAPTER_META: Record<
  string,
  { number: number; total: number; label: string }
> = {
  'section-1': { number: 1, total: 4, label: 'Vocês dois' },
  'section-4': { number: 2, total: 4, label: 'Pessoas importantes' },
  'section-5': { number: 3, total: 4, label: 'A cerimônia' },
  'section-8': { number: 4, total: 4, label: 'Última pergunta' },
  uploads: { number: 5, total: 5, label: 'Áudios' },
};

const REMOVED_STEP_REDIRECT: Partial<Record<AppStep, AppStep>> = {
  'section-2': 'section-4',
  'section-3': 'section-4',
  'section-6': 'section-8',
  'section-7': 'section-8',
};

export function normalizeStep(step: AppStep | string | undefined): AppStep {
  if (!step) return 'hero';
  const redirected = REMOVED_STEP_REDIRECT[step as AppStep];
  if (redirected) return redirected;
  if ((FLOW as string[]).includes(step)) return step as AppStep;
  return 'hero';
}

export function getNextStep(step: AppStep): AppStep | null {
  const index = FLOW.indexOf(step);
  if (index < 0 || index >= FLOW.length - 1) return null;
  return FLOW[index + 1];
}

export function getPrevStep(step: AppStep): AppStep | null {
  const index = FLOW.indexOf(step);
  if (index <= 0) return null;
  return FLOW[index - 1];
}
