"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";

const steps = [
  {
    number: "1",
    title: "Photographiez votre jardin",
    text: "Une seule photo suffit pour commencer.",
  },
  {
    number: "2",
    title: "L'IA analyse l'espace",
    text: "Végétation, surfaces, éléments existants.",
  },
  {
    number: "3",
    title: "Recevez une idée d'aménagement",
    text: "Un rendu visuel généré pour votre jardin.",
  },
];

export default function Home() {
  const [preview, setPreview] = useState<{ file: File; url: string } | null>(
    null
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-8">
      <div className="mb-8 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-olive" />
        <span className="text-sm font-medium tracking-wide text-ink/70">
          Jardin IA
        </span>
      </div>

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

      <section className="mt-12 flex flex-col gap-5 border-t border-line pt-8">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <span className="font-display text-xl text-olive">
              {step.number}
            </span>
            <div>
              <p className="text-[15px] font-medium text-ink">{step.title}</p>
              <p className="mt-0.5 text-sm text-ink/60">{step.text}</p>
            </div>
          </div>
        ))}
      </section>

      <p className="mt-10 text-center text-xs text-ink/40">
        Les rendus sont des visualisations à but d&apos;inspiration et ne
        garantissent pas la faisabilité technique exacte.
      </p>
    </main>
  );
}
