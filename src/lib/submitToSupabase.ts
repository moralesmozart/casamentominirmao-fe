import type { CeremonyAnswers, UploadedFileMeta } from '../types/form';
import { CEREMONY_MEDIA_BUCKET, isSupabaseConfigured, supabase } from './supabase';

export interface MediaRecord {
  path: string;
  name: string;
  type: string;
  size: number;
  kind: 'file' | 'audio';
}

export interface SubmitResult {
  submissionId: string;
  media: MediaRecord[];
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

function safeFileName(name: string) {
  return name.replace(/[^\w.\-()\sÀ-ÿ]+/gi, '_').slice(0, 120);
}

async function uploadMedia(
  submissionId: string,
  files: UploadedFileMeta[],
  kind: 'file' | 'audio',
): Promise<MediaRecord[]> {
  if (!supabase) return [];

  const uploaded: MediaRecord[] = [];

  for (const file of files) {
    if (!file.dataUrl) continue;

    const folder = kind === 'audio' ? 'audios' : 'files';
    const path = `${submissionId}/${folder}/${safeFileName(file.name)}`;
    const blob = dataUrlToBlob(file.dataUrl);

    const { error } = await supabase.storage
      .from(CEREMONY_MEDIA_BUCKET)
      .upload(path, blob, {
        contentType: file.type || blob.type,
        upsert: true,
      });

    if (error) {
      throw new Error('Não foi possível enviar um dos anexos. Tente de novo.');
    }

    uploaded.push({
      path,
      name: file.name,
      type: file.type,
      size: file.size,
      kind,
    });
  }

  return uploaded;
}

function answersWithoutHeavyMedia(answers: CeremonyAnswers): CeremonyAnswers {
  return {
    ...answers,
    uploads: {
      ...answers.uploads,
      files: answers.uploads.files.map(({ dataUrl: _dataUrl, ...rest }) => rest),
      audios: (answers.uploads.audios ?? []).map(({ dataUrl: _dataUrl, ...rest }) => rest),
    },
  };
}

export async function submitCeremonyToSupabase(
  answers: CeremonyAnswers,
): Promise<SubmitResult> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Envio indisponível no momento. Tente de novo mais tarde.');
  }

  const submissionId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();

  const media = [
    ...(await uploadMedia(submissionId, answers.uploads.audios ?? [], 'audio')),
    ...(await uploadMedia(submissionId, answers.uploads.files ?? [], 'file')),
  ];

  const { error } = await supabase.from('ceremony_submissions').insert({
    id: submissionId,
    couple_paula: 'Paula Velasco',
    couple_felipe: 'Felipe Lenzi Rocha',
    answers: answersWithoutHeavyMedia(answers),
    media,
    submitted_at: submittedAt,
  });

  if (error) {
    throw new Error('Não foi possível enviar as respostas. Tente de novo.');
  }

  return { submissionId, media };
}
