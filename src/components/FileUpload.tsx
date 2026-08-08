import type { ChangeEvent } from 'react';
import type { UploadedFileMeta } from '../types/form';
import { createId } from '../utils/id';

const MAX_FILE_BYTES = 1_500_000;

interface FileUploadProps {
  files: UploadedFileMeta[];
  onChange: (files: UploadedFileMeta[]) => void;
}

async function readFile(file: File): Promise<UploadedFileMeta> {
  const base: UploadedFileMeta = {
    id: createId(),
    name: file.name,
    type: file.type || 'application/octet-stream',
    size: file.size,
  };

  if (file.size > MAX_FILE_BYTES) {
    return {
      ...base,
      note: 'Arquivo grande demais para salvar no navegador — o nome foi registrado.',
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

function formatSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({ files, onChange }: FileUploadProps) {
  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    if (!selected.length) return;

    const parsed = await Promise.all(selected.map(readFile));
    onChange([...files, ...parsed]);
    event.target.value = '';
  };

  const removeFile = (id: string) => {
    onChange(files.filter((file) => file.id !== id));
  };

  return (
    <div className="field">
      <label className="field__label" htmlFor="uploads">
        Fotos, vídeos, prints, referências…
      </label>
      <p className="field__hint">
        Fotos antigas, prints de conversas, vídeos, músicas, qualquer coisa que ajude a contar a
        história de vocês. Opcional.
      </p>
      <label className="upload-drop" htmlFor="uploads">
        <input
          id="uploads"
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt,.mp3,.m4a"
          onChange={handleFiles}
        />
        <span className="upload-drop__title">Escolher arquivos</span>
        <span className="upload-drop__meta">
          Imagens, vídeos, PDFs ou áudios. Arquivos grandes ficam só com o nome registrado.
        </span>
      </label>

      {files.length > 0 ? (
        <ul className="upload-list">
          {files.map((file) => (
            <li key={file.id} className="upload-item">
              <div>
                <strong>{file.name}</strong>
                <span>
                  {formatSize(file.size)}
                  {file.note ? ` · ${file.note}` : file.dataUrl ? ' · salvo localmente' : ''}
                </span>
              </div>
              <button type="button" className="btn btn--text" onClick={() => removeFile(file.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
