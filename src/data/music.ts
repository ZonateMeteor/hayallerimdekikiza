// ============================================================
// MÜZİKLER - Bu dosyayı kolayca düzenleyebilirsin
// ============================================================
// Her müzik için { id, name, artist, description, file, cover } ekle.
// file: "public/muzik/muzikler/" klasöründeki mp3 dosya adı (örn: "sarki1.mp3")
// cover: "public/muzik/muzik_kapaklari/" klasöründeki kapak dosya adı (örn: "sarki1.svg")
// Kendi mp3 dosyalarını public/muzik/muzikler/ klasörüne koy ve file adını eşleştir.
// Kapak görsellerini public/muzik/muzik_kapaklari/ klasörüne koy ve cover adını eşleştir.

export interface MusicTrack {
  id: string;
  name: string;
  artist: string;
  description: string;
  file: string;
  cover: string;
}

export const musicTracks: MusicTrack[] = [
  {
    id: "muzik-1",
    name: "Dragon Eyes",
    artist: "Adrianne Lenker",
    description: "I just want a place with you... I just want a place...",
    file: "sarki1.mp3",
    cover: "sarki1.webp",
  },
  {
    id: "muzik-2",
    name: "Forwards Beckon Rebound",
    artist: "Adrianne Lenker",
    description: "Show me pictures that hang in your house",
    file: "sarki2.mp3",
    cover: "sarki2.webp",
  },
  {
    id: "muzik-3",
    name: "Pretty Girls Make Graves",
    artist: "The Smiths",
    description: "I'm not the man you think I am",
    file: "sarki3.mp3",
    cover: "sarki3.webp",
  },
  {
    id: "muzik-4",
    name: "Ez Kurdistanim",
    artist: "Hozan Serhad",
    description: "Tu Kurdistana minî",
    file: "sarki4.mp3",
    cover: "sarki4.webp",
  },
];
