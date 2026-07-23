import { useEffect, useState } from "react";
import { fetchScores, submitScore, type ScoreEntry } from "../../lib/scores";

interface GameOverProps {
  game: string;
  gameLabel: string;
  score: number;
  onRestart: () => void;
  onExit: () => void;
}

export function GameOver({ game, gameLabel, score, onRestart, onExit }: GameOverProps) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores(game).then((s) => {
      setScores(s);
      setLoading(false);
    });
  }, [game]);

  async function submit() {
    const trimmed = name.trim() || "Misafir";
    await submitScore(game, trimmed, score);
    setSubmitted(true);
    const fresh = await fetchScores(game);
    setScores(fresh);
  }

  return (
    <div className="surface mx-auto w-full max-w-md rounded-2xl p-6 text-center shadow-xl">
      <h2 className="text-2xl font-bold">Oyun Bitti</h2>
      <p className="text-muted mt-1 text-sm">{gameLabel}</p>
      <p className="mt-4 text-4xl font-extrabold" style={{ color: "var(--accent)" }}>
        {score}
      </p>

      {!submitted ? (
        <div className="mt-6 flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="İsmin"
            maxLength={20}
            className="surface rounded-xl px-4 py-2.5 text-center outline-none"
          />
          <button onClick={submit} className="bg-primary rounded-xl px-4 py-2.5 font-semibold text-white transition">
            Skoru kaydet
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm text-accent">Skorun kaydedildi.</p>
      )}

      <div className="mt-6">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted">Sıralama</h3>
        {loading ? (
          <p className="text-muted text-sm">Yükleniyor...</p>
        ) : scores.length === 0 ? (
          <p className="text-muted text-sm">Henüz skor yok.</p>
        ) : (
          <ol className="flex flex-col gap-1">
            {scores.map((s, i) => (
              <li
                key={s.id}
                className="surface flex items-center justify-between rounded-lg px-3 py-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="text-muted w-6 text-right">{i + 1}.</span>
                  <span className="font-medium">{s.player_name}</span>
                </span>
                <span className="font-bold">{s.score}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <button onClick={onRestart} className="bg-primary flex-1 rounded-xl px-4 py-2.5 font-semibold text-white transition">
          Tekrar oyna
        </button>
        <button onClick={onExit} className="surface surface-hover flex-1 rounded-xl px-4 py-2.5 font-semibold transition">
          Çık
        </button>
      </div>
    </div>
  );
}
