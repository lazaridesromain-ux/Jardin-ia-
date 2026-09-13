"use client";

import { useCallback, useRef, useState } from "react";

type UploadZoneProps = {
  onPhotoSelected: (file: File, previewUrl: string) => void;
};

export default function UploadZone({ onPhotoSelected }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Ce fichier n'est pas une image. Choisissez une photo (JPG, PNG).");
        return;
      }

      const maxSizeMb = 15;
      if (file.size > maxSizeMb * 1024 * 1024) {
        setError(`L'image dépasse ${maxSizeMb} Mo. Choisissez une photo plus légère.`);
        return;
      }

      setError(null);
      const previewUrl = URL.createObjectURL(file);
      onPhotoSelected(file, previewUrl);
    },
    [onPhotoSelected]
  );

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
          isDragging ? "border-olive bg-olive/5" : "border-line bg-white/40"
        }`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-olive"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 8.25 12 3.75m0 0L7.5 8.25M12 3.75v13.5"
          />
        </svg>

        <div>
          <p className="font-medium text-ink">Glissez une photo de votre jardin ici</p>
          <p className="mt-1 text-sm text-ink/60">ou</p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-olive px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-olive-dark"
        >
          Choisir une photo
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
