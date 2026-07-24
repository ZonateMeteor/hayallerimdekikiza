import { useEffect, useRef, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { musicTracks } from "../data/music";
import { Play, Pause } from "lucide-react";

export function MusicPage({ onBack }: { onBack: () => void }) {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  function playTrack(id: string, file: string) {
    const audio = audioRef.current!;
    if (currentId === id && playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (currentId !== id) {
      audio.src = `/muzik/muzikler/${file}`;
      audio.play().catch(() => {});
      setCurrentId(id);
      setPlaying(true);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }

  function togglePlay() {
    const audio = audioRef.current!;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else if (currentId) {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }

  return (
    <div className="app-bg min-h-screen">
      <PageHeader title="Müzikler" onBack={onBack} />
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <ul className="flex flex-col gap-3">
          {musicTracks.map((track) => {
            const isCurrent = currentId === track.id;
            const isPlaying = isCurrent && playing;
            return (
              <li
                key={track.id}
                className={`surface rounded-2xl p-4 transition ${isCurrent ? "ring-2" : ""}`}
                style={isCurrent ? { boxShadow: "0 0 0 2px var(--primary)" } : undefined}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl"
                    style={{ background: "var(--border)" }}
                  >
                    <img
                      src={`/muzik/muzik_kapaklari/${track.cover}`}
                      alt={track.name}
                      className="h-full w-full object-cover"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold">{track.name}</h3>
                    <p className="text-muted truncate text-xs uppercase tracking-widest">{track.artist}</p>
                    <p className="text-muted mt-1 line-clamp-2 text-sm">{track.description}</p>
                  </div>
                  <button
                    onClick={() => playTrack(track.id, track.file)}
                    className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white transition hover:scale-105"
                    aria-label={isPlaying ? "Durdur" : "Çal"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {currentId && (
          <div className="surface mt-6 flex items-center gap-4 rounded-2xl p-4">
            <button
              onClick={togglePlay}
              className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:scale-105"
              aria-label={playing ? "Durdur" : "Çal"}
            >
              {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {musicTracks.find((t) => t.id === currentId)?.name}
              </p>
              <p className="text-muted text-xs">{playing ? "Çalıyor..." : "Duraklatıldı"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
