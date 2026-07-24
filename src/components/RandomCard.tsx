import { useState } from "react";
import { Heart, Shuffle, Star, X } from "lucide-react";
import { getFavorites, toggleFavorite, type FavoriteEntry } from "../lib/favorites";

interface RandomCardProps {
  type: "poem" | "confession";
  items: { id: string; title: string; text: string; author?: string }[];
  emptyHint: string;
  drawLabel: string;
  onNavigate?: () => void;
}

export function RandomCard({ type, items, emptyHint, drawLabel }: RandomCardProps) {
  const [current, setCurrent] = useState<(typeof items)[number] | null>(null);
  const [fav, setFav] = useState(false);
  const [favPulse, setFavPulse] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  function draw() {
    if (items.length === 0) return;
    let next = current;
    if (items.length > 1) {
      do {
        next = items[Math.floor(Math.random() * items.length)];
      } while (next.id === current?.id);
    } else {
      next = items[0];
    }
    setCurrent(next);
    setFav(getFavorites().some((f) => f.type === type && f.id === next.id));
  }

  function toggleFav() {
    if (!current) return;
    const now = toggleFavorite({
      type,
      id: current.id,
      title: current.title,
      text: current.text,
    });
    setFav(now);
    setFavPulse(true);
    setTimeout(() => setFavPulse(false), 400);
  }

  const favorites = getFavorites().filter((f) => f.type === type);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-8">
      <button
        onClick={draw}
        className="bg-primary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
      >
        <Shuffle size={18} />
        {drawLabel}
      </button>

      {current ? (
        <article
          key={current.id}
          className="surface animate-fade-in-up w-full rounded-2xl p-6 shadow-xl"
        >
          <h2 className="mb-1 text-xl font-bold tracking-wide">{current.title}</h2>
          {current.author && <p className="text-muted mb-4 text-xs uppercase tracking-widest">{current.author}</p>}
          <p className="whitespace-pre-line leading-relaxed">{current.text}</p>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={toggleFav}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition surface surface-hover"
            >
              <Heart
                size={16}
                className={favPulse ? "animate-heart" : ""}
                color={fav ? "#ef4444" : "currentColor"}
                fill={fav ? "#ef4444" : "none"}
              />
              <span>{fav ? "Favorilerde" : "Favorilere ekle"}</span>
            </button>
            <button
              onClick={() => setShowFavs(true)}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition surface surface-hover"
            >
              <Star size={16} className="text-accent" />
              Favoriler ({favorites.length})
            </button>
          </div>
        </article>
      ) : (
        <p className="text-muted text-sm">{emptyHint}</p>
      )}

      {showFavs && (
        <FavoritesModal
          type={type}
          favorites={favorites}
          onClose={() => setShowFavs(false)}
          onOpen={(f) => {
            const found = items.find((i) => i.id === f.id);
            if (found) {
              setCurrent(found);
              setFav(true);
            }
            setShowFavs(false);
          }}
        />
      )}
    </div>
  );
}

function FavoritesModal({
  favorites,
  onClose,
  onOpen,
}: {
  type: "poem" | "confession";
  favorites: FavoriteEntry[];
  onClose: () => void;
  onOpen: (f: FavoriteEntry) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="surface animate-fade-in-up relative w-full max-w-md rounded-2xl p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Favoriler</h3>
          <button onClick={onClose} className="surface surface-hover rounded-lg p-2" aria-label="Kapat">
            <X size={18} />
          </button>
        </div>
        {favorites.length === 0 ? (
          <p className="text-muted text-sm">Henüz favori yok. Kalbe basarak ekle.</p>
        ) : (
          <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto">
            {favorites.map((f) => (
              <li key={f.id}>
                <button
                  onClick={() => onOpen(f)}
                  className="surface surface-hover w-full rounded-xl px-4 py-3 text-left text-sm transition"
                >
                  <span className="font-medium">{f.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
