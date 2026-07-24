// ============================================================
// ANILAR - Bu dosyayı kolayca düzenleyebilirsin
// ============================================================
// Her anı için { id, date, event, description } ekle.
// date: "GG.AA.YYYY" formatında olsun ki sıralama doğru çalışsın.
// EN ESKİ TARİH EN ÜSTTE OLACAK ŞEKİLDE yaz (eski -> yeni sırası).
// Eski tarih en üstte yazdığın ilk önce çıkar.

export interface Memory {
  id: string;
  date: string;
  event: string;
  description: string;
}

export const memories: Memory[] = [
  {
    id: "ani-1",
    date: "01.09.2018",
    event: "ILK TANISMA",
    description: "Seninle ilk tanıştığımız günü hiç unutmuyorum. O an hayatımın değişeceğinden haberim yoktu.",
  },
  {
    id: "ani-2",
    date: "15.03.2020",
    event: "ILK YOLCULUK",
    description: "Birlikte çıktığımız ilk uzun yolculuk. Arabada söylediğimiz şarkılar hâlâ aklımda.",
  },
  {
    id: "ani-3",
    date: "20.07.2022",
    event: "DOĞUM GÜNÜ PARTISI",
    description: "Sana sürpriz yaptığımız o doğum günü partisi. Herkesin yüzündeki gülümseme çok değerliydi.",
  },
];
