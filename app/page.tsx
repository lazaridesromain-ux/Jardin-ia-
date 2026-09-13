"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";

export default function Home() {
  const [preview, setPreview] = useState<{ file: File; url: string } | null>(
    null
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-10">
      <header className="mb-8">
        <p className="font-display text-3xl leading-tight text-ink">
          Votre jardin,
          <br />
          transformé en quelques secondes
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
          Prenez votre jardin en photo et découvrez gratuitement une première
          idée d&apos;aménagement générée par IA.
        </p>
      </header>

      {!preview && <UploadZone onPhotoSelected={(file, url) => setPreview({ file, url })} />}

      {preview && (
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview.url}
              alt="Photo de votre jardin"
              className="max-h-80 w-full object-cover"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-olive py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-olive-dark"
          >
            Générer une idée d&apos;aménagement
          </button>

          <button
            type="button"
            onClick={() => setPreview(null)}
            className="text-sm text-ink/60 underline underline-offset-2"
          >
            Choisir une autre photo
          </button>
        </div>
      )}

      <p className="mt-auto pt-10 text-center text-xs text-ink/40">
        Les rendus sont des visualisations à but d&apos;inspiration et ne
        garantissent pas la faisabilité technique exacte.
      </p>
    </main>
  );
}
