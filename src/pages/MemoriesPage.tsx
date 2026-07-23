import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { memories } from "../data/memories";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MemoriesPage({ onBack }: { onBack: () => void }) {
  // En eski tarih en üstte olacak şekilde sırala (data zaten öyle, ama garantiye al)
  const sorted = [...memories].sort((a, b) => parseDate(a.date) - parseDate(b.date));
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<"left" | "right">("right");

  const current = sorted[index];

  function parseDate(s: string): number {
    const [d, m, y] = s.split(".").map(Number);
    return new Date(y, m - 1, d).getTime();
  }

  function go(delta: number) {
    setDir(delta > 0 ? "right" : "left");
    setIndex((i) => Math.min(sorted.length - 1, Math.max(0, i + delta)));
  }

  return (
    <div className="app-bg min-h-screen">
      <PageHeader title="Anılar" onBack={onBack} />
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-10">
        <div className="text-muted text-xs tracking-widest uppercase">
          {index + 1} / {sorted.length}
        </div>

        <div className="flex w-full items-center gap-3">
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            className="surface surface-hover rounded-full p-3 transition disabled:opacity-30"
            aria-label="Önceki anı"
          >
            <ChevronLeft size={24} />
          </button>

          {current && (
            <article
              key={current.id}
              className={`surface flex-1 rounded-3xl p-8 shadow-xl ${dir === "right" ? "animate-slide-right" : "animate-slide-left"}`}
            >
              <p
                className="mb-4 text-2xl font-bold tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                {current.date}
              </p>
              <h2 className="mb-4 text-2xl font-extrabold uppercase tracking-wider">
                {current.event}
              </h2>
              <p className="leading-relaxed text-lg">{current.description}</p>
            </article>
          )}

          <button
            onClick={() => go(1)}
            disabled={index === sorted.length - 1}
            className="surface surface-hover rounded-full p-3 transition disabled:opacity-30"
            aria-label="Sonraki anı"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex gap-1.5">
          {sorted.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? "24px" : "8px",
                background: i === index ? "var(--primary)" : "var(--border)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
