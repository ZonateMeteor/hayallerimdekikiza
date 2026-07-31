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
    description: "I just want a place with you..",
    file: "sarki1.mp3",
    cover: "sarki1.svg",
  },
  {
    id: "muzik-2",
    name: "Sarki 2",
    artist: "Örnek Sanatçı",
    description: "Bu müzik için açıklama buraya gelecek. Dosyadaki bu yazıyı değiştir.",
    file: "sarki2.mp3",
    cover: "sarki2.svg",
  },
  {
    id: "muzik-3",
    name: "Sarki 3",
    artist: "Örnek Sanatçı",
    description: "Bu müzik için açıklama buraya gelecek. Dosyadaki bu yazıyı değiştir.",
    file: "sarki3.mp3",
    cover: "sarki3.svg",
  },
  {
    id: "muzik-4",
    name: "Sarki 4",
    artist: "Örnek Sanatçı",
    description: "Bu müzik için açıklama buraya gelecek. Dosyadaki bu yazıyı değiştir.",
    file: "sarki4.mp3",
    cover: "sarki4.svg",
  },
  {
    id: "muzik-5",
    name: "Sarki 5",
    artist: "Örnek Sanatçı",
    description: "Bu müzik için açıklama buraya gelecek. Dosyadaki bu yazıyı değiştir.",
    file: "sarki5.mp3",
    cover: "sarki5.svg",
  },
  {
    id: "muzik-6",
    name: "Sarki 6",
    artist: "Örnek Sanatçı",
    description: "Bu müzik için açıklama buraya gelecek. Dosyadaki bu yazıyı değiştir.",
    file: "sarki6.mp3",
    cover: "sarki6.svg",
  },
];
