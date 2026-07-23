// ============================================================
// İTİRAFLAR - Bu dosyayı kolayca düzenleyebilirsin
// ============================================================
// Her itiraf için { id, title, text } ekleyebilirsin.
// Yeni itiraf eklemek için listeye yeni nesne ekle.

export interface Confession {
  id: string;
  title: string;
  text: string;
}

export const confessions: Confession[] = [
  {
    id: "itiraf-1",
    title: "İlk Gün",
    text: "Seni ilk gördüğüm gün aklımdan hiç çıkmadın. O günden beri her şey değişti.",
  },
  {
    id: "itiraf-2",
    title: "Gizli Hayran",
    text: "Sana söylemeye çekindiğim çok şey var. Ama bugün, doğum gününde, hepsini söylemek istiyorum.",
  },
  {
    id: "itiraf-3",
    title: "Teşekkür",
    text: "Varlığın için teşekkür ederim. Sen benim en güzel kazanımlarımdan birisin.",
  },
];
