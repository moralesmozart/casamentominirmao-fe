import type { AppStep } from '../types/form';

export interface StepMeta {
  id: AppStep;
  kind: 'landing' | 'chapter' | 'complete';
  number?: number;
  total?: number;
  label?: string;
}

export const QUESTION_STEPS: AppStep[] = [
  'section-1',
  'section-2',
  'section-3',
  'section-4',
  'section-5',
  'section-6',
  'section-7',
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
  'section-1': { number: 1, total: 8, label: 'Vocês dois' },
  'section-2': { number: 2, total: 8, label: 'Um no outro' },
  'section-3': { number: 3, total: 8, label: 'Amor e futuro' },
  'section-4': { number: 4, total: 8, label: 'Pessoas importantes' },
  'section-5': { number: 5, total: 8, label: 'A cerimônia' },
  'section-6': { number: 6, total: 8, label: 'Material secreto' },
  'section-7': { number: 7, total: 8, label: 'Arquivo Mini Irmão' },
  'section-8': { number: 8, total: 8, label: 'Última pergunta' },
  uploads: { number: 9, total: 9, label: 'Arquivos extras' },
};

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
