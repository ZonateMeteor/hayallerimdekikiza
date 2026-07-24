// ============================================================
// ŞİİRLER - Bu dosyayı kolayca düzenleyebilirsin
// ============================================================
// Her şiir için { id, title, author, text } ekleyebilirsin.
// "text" alanında satır aralarında \\n kullanabilirsin.
// Yeni şiir eklemek için aşağıdaki listeye yeni bir nesne ekle.

export interface Poem {
  id: string;
  title: string;
  author: string;
  text: string;
}

export const poems: Poem[] = [
  {
    id: "siir-1",
    title: "Sana",
    author: "Anonim",
    text: "Gözlerinde bir deniz var,\nDalgalar usul usul vurur kalbime.\nSen güldüğünde dünyam aydınlanır,\nSen ağladığında gökyüzü ağlar.",
  },
  {
    id: "siir-2",
    title: "Doğum Günü",
    author: "Anonim",
    text: "Bugün senin günün,\nMumlar üflenecek, dilekler tutulacak.\nYeni yaşın yeni başlangıçlar getirsin,\nKalbin hep sevinçle dolsun.",
  },
  {
    id: "siir-3",
    title: "Arkadaşlık",
    author: "Anonim",
    text: "Yollar uzun, yıllar çabuk geçer,\nAma dostluk zamanı durdurur.\nSen benim için öylesin,\nBir ömür boyu sürecek bir hikaye.",
  },
  {
    id: "siir-4",
    title: "Hayat",
    author: "Anonim",
    text: "Hayat bazen zor, bazen kolay,\nAma her gün yeni bir umut.\nGülümse, dünya seninle güzelleşir,\nIşığın hiç sönmesin.",
  },
];
