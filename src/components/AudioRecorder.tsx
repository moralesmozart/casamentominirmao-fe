import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import type { UploadedFileMeta } from '../types/form';
import { createId } from '../utils/id';

const MAX_AUDIO_BYTES = 4_000_000;

interface AudioRecorderProps {
  audios: UploadedFileMeta[];
  onChange: (audios: UploadedFileMeta[]) => void;
}

function formatSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

async function fileToMeta(file: File, label?: string): Promise<UploadedFileMeta> {
  const base: UploadedFileMeta = {
    id: createId(),
    name: label ?? file.name,
    type: file.type || 'audio/webm',
    size: file.size,
    kind: 'audio',
  };

  if (file.size > MAX_AUDIO_BYTES) {
    return {
      ...base,
      note: 'Áudio grande demais para o navegador — o nome foi registrado. Com o envio na nuvem, isso passa a funcionar bem.',
    };
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  return { ...base, dataUrl };
}

export function AudioRecorder({ audios, onChange }: AudioRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = async () => {
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Este navegador não permite gravar áudio. Vocês podem enviar um arquivo de áudio abaixo.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunks.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4')
          ? 'audio/mp4'
          : '';

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorder.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.current.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks.current, {
          type: recorder.mimeType || 'audio/webm',
        });
        const extension = blob.type.includes('mp4') ? 'm4a' : 'webm';
        const file = new File(
          [blob],
          `audio-mini-irmao-${new Date().toISOString().replace(/[:.]/g, '-')}.${extension}`,
          { type: blob.type },
        );
        const meta = await fileToMeta(file, `Gravação ${audios.length + 1}`);
        onChange([...audios, meta]);
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      recorder.start();
      setRecording(true);
      setSeconds(0);
      timer.current = window.setInterval(() => {
        setSeconds((value) => value + 1);
      }, 1000);
    } catch {
      setError('Não foi possível acessar o microfone. Verifiquem a permissão do navegador ou enviem um arquivo de áudio.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
    }
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    setRecording(false);
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    if (!selected.length) return;
    const parsed = await Promise.all(
      selected.map((file, index) =>
        fileToMeta(file, file.name || `Áudio enviado ${audios.length + index + 1}`),
      ),
    );
    onChange([...audios, ...parsed]);
    event.target.value = '';
  };

  const removeAudio = (id: string) => {
    onChange(audios.filter((audio) => audio.id !== id));
  };

  return (
    <div className="field audio-field">
      <p className="field__label">Quer falar em vez de escrever?</p>
      <p className="field__hint">
        Gravem um áudio contando uma história, um detalhe, ou aquilo que é mais fácil falar do
        que digitar. Podem gravar aqui ou enviar um arquivo.
      </p>

      <div className="audio-actions">
        {!recording ? (
          <button type="button" className="btn btn--primary" onClick={startRecording}>
            Gravar áudio
          </button>
        ) : (
          <button type="button" className="btn btn--record" onClick={stopRecording}>
            <span className="record-dot" aria-hidden="true" />
            Parar · {formatDuration(seconds)}
          </button>
        )}

        <label className="btn btn--ghost audio-upload-btn" htmlFor="audio-upload">
          Enviar arquivo de áudio
          <input
            id="audio-upload"
            type="file"
            accept="audio/*,.mp3,.m4a,.wav,.ogg,.webm"
            multiple
            onChange={handleUpload}
          />
        </label>
      </div>

      {error ? <p className="field__error">{error}</p> : null}

      {audios.length > 0 ? (
        <ul className="upload-list">
          {audios.map((audio) => (
            <li key={audio.id} className="upload-item upload-item--audio">
              <div>
                <strong>{audio.name}</strong>
                <span>
                  {formatSize(audio.size)}
                  {audio.note ? ` · ${audio.note}` : audio.dataUrl ? ' · salvo localmente' : ''}
                </span>
                {audio.dataUrl ? (
                  <audio controls preload="metadata" src={audio.dataUrl}>
                    Seu navegador não reproduz este áudio.
                  </audio>
                ) : null}
              </div>
              <button type="button" className="btn btn--text" onClick={() => removeAudio(audio.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
