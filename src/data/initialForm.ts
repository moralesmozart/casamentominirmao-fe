import type { CeremonyAnswers } from '../types/form';

const emptyDual = () => ({
  paulaAboutFelipe: '',
  felipeAboutPaula: '',
});

export function createEmptyAnswers(): CeremonyAnswers {
  return {
    relationshipStory: {
      howWeMet: '',
      whenItBecameSpecial: '',
      firstMoment: '',
      definingStory: '',
      importantMoment: '',
      difficultMoment: '',
    },
    admiration: {
      admire: emptyDual(),
      beautifulActions: emptyDual(),
      qualities: emptyDual(),
      annoyingTraits: emptyDual(),
      lessons: '',
      threeWords: emptyDual(),
    },
    marriage: {
      meaning: '',
      lastingRelationship: '',
      buildTogether: '',
      future10Years: '',
      future50Years: '',
      inspirations: '',
    },
    importantPeople: {
      people: [],
      specialMentions: '',
      absentPeople: '',
      speakers: [],
    },
    ceremony: {
      tone: [],
      desiredEmotions: [],
      emotionsNote: '',
      rituals: [],
      ritualsOther: '',
      rings: '',
      ringsOther: '',
      coupleSpeech: '',
    },
    funnyStories: {
      coupleStory: '',
      absurdStory: '',
      paulaStory: '',
      felipeStory: '',
      forbiddenStories: '',
      insideJokes: '',
    },
    miniIrmao: {
      firstMemory: '',
      importantStory: '',
      relationshipDescription: '',
      twentyYearStory: '',
    },
    final: {
      anythingElse: '',
      messageToGuests: '',
    },
    uploads: {
      files: [],
      audios: [],
      links: '',
    },
  };
}
