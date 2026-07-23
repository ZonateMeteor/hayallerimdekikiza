// localStorage tabanlı favori yönetimi.
// Favoriler tarayıcıda kalıcı olarak saklanır.

const KEY = "birthday_favorites";

export interface FavoriteEntry {
  type: "poem" | "confession";
  id: string;
  title: string;
  text: string;
}

export function getFavorites(): FavoriteEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FavoriteEntry[];
  } catch {
    return [];
  }
}

export function isFavorited(type: "poem" | "confession", id: string): boolean {
  return getFavorites().some((f) => f.type === type && f.id === id);
}

export function toggleFavorite(entry: FavoriteEntry): boolean {
  const list = getFavorites();
  const idx = list.findIndex((f) => f.type === entry.type && f.id === entry.id);
  let nowFav: boolean;
  if (idx >= 0) {
    list.splice(idx, 1);
    nowFav = false;
  } else {
    list.push(entry);
    nowFav = true;
  }
  localStorage.setItem(KEY, JSON.stringify(list));
  return nowFav;
}
