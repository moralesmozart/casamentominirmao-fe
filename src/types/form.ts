export interface PersonEntry {
  id: string;
  name: string;
  relationship: string;
  whyImportant: string;
}

export interface SpeakerEntry {
  id: string;
  name: string;
  relationship: string;
  participation: string;
}

export interface UploadedFileMeta {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl?: string;
  note?: string;
  kind?: 'file' | 'audio';
}

export interface DualAnswer {
  paulaAboutFelipe: string;
  felipeAboutPaula: string;
}

export interface CeremonyAnswers {
  relationshipStory: {
    howWeMet: string;
    whenItBecameSpecial: string;
    firstMoment: string;
    definingStory: string;
    importantMoment: string;
    difficultMoment: string;
  };
  admiration: {
    admire: DualAnswer;
    beautifulActions: DualAnswer;
    qualities: DualAnswer;
    annoyingTraits: DualAnswer;
    lessons: string;
    threeWords: DualAnswer;
  };
  marriage: {
    meaning: string;
    lastingRelationship: string;
    buildTogether: string;
    future10Years: string;
    future50Years: string;
    inspirations: string;
  };
  importantPeople: {
    people: PersonEntry[];
    specialMentions: string;
    absentPeople: string;
    speakers: SpeakerEntry[];
  };
  ceremony: {
    tone: string[];
    desiredEmotions: string[];
    emotionsNote: string;
    rituals: string[];
    ritualsOther: string;
    rings: string;
    ringsOther: string;
    coupleSpeech: string;
  };
  funnyStories: {
    coupleStory: string;
    absurdStory: string;
    paulaStory: string;
    felipeStory: string;
    forbiddenStories: string;
    insideJokes: string;
  };
  miniIrmao: {
    firstMemory: string;
    importantStory: string;
    relationshipDescription: string;
    twentyYearStory: string;
  };
  final: {
    anythingElse: string;
    messageToGuests: string;
  };
  uploads: {
    files: UploadedFileMeta[];
    audios: UploadedFileMeta[];
    links: string;
  };
}

export type AppStep =
  | 'hero'
  | 'intro'
  | 'section-1'
  | 'section-2'
  | 'section-3'
  | 'section-4'
  | 'section-5'
  | 'section-6'
  | 'section-7'
  | 'section-8'
  | 'uploads'
  | 'complete';

export interface PersistedState {
  version: number;
  step: AppStep;
  answers: CeremonyAnswers;
  submittedAt: string | null;
  updatedAt: string;
}

export const STORAGE_KEY = 'casamento-mini-irmao-v1';
