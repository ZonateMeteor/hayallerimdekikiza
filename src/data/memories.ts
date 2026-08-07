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
    date: "11 Ağustos 2025",
    event: "ILK TANISMA",
    description: "Seninle ilk tanıştığımız günü hiç unutmuyorum. O an hayatımın değişeceğinden haberim yoktu. Gizem o gün bana senden bahsetti bir de aslında bana anlatmadan 2 gün önce sana demiş bunu anlatmış mıydı bilmiyorum bana anlattığında meğer sen bana istek atmışsın bile ben görmemiştim isteği hatırlarsan, bir de 3 seçenek koymuştu seni arkadaşlarımdan birine ayarlicam diye halbuki tek seçenek sendin isimlerini hatırlamıyorum iki kişiden daha bahsetmişti sonra dedi bunlar düz sıradan insan en mükemmeli jinda dil seviyor diye bende etkilendim anlatınca şaglsş sonra istek attım filan bir de biz takipleştik ama dm atamıyorduk alflsal çok garipti gizem bize pirno diye grup açıp çıkarak dm yapmıştı nedense hiç unutmuyorum neredeyse bir yıl olacak ve hayatımda aldığım en güzel kararlardan biri sanırım gizemle tanışmak olabilir o vesile oldu alflsşs favori çöpçatanım o",
  },
  {
    id: "ani-2",
    date: "1 Eylül 2025",
    event: "ilk buluşma",
    description: "Garip bir şekilde ilk buluşmaya kadar birbirimizin yüzünü görmedik ALGLSLSŞAŞD aşırı heyecanlıydım kütüphanede gelmeni beklerken heyecandan ter bastı iyice otistik hissetmiştim kendimi ama görür görmez çarpıldım sanki aldslaş zaten daha öncesinde de zekana ve karakterine yeterince hayran kalmıştım ama o an görünce dedim bir insan her bakımdan mı bu kadar mükemmel olur. Bu sene hediye veremiyorum belki gene şartlar el vermedi ama geçen sene geç de olsa vermiştim en azından bir de kardeşim paketi açmıştı not yazdığım bi kağıt vardı kitabın arasında o yırtılmıştı sabahın köründe açık yer yoktu adam akıllı düz kare kağıda yazdım kütüphanedeki abiden alıp doğum günün kutlu olsun yazmıştım boş vermemekti maksat.",
  },
  {
    id: "ani-3",
    date: "Ağustos 2026",
    event: "Şimdiiii",
    description: "Şu an hayat bazı konularda zor geliyor biliyorum ama nolursa olsun hiçbir şeyin senin üzülmene neden olmasını istemem, maalesef ki elimden bir şey gelmez bazı konularda. üniversitedir tercih ve sınavlardır bunlar önemli şeyler ama dünyanın sonu değiller ne de olsa; senin de dediğin gibi hiçbir şeyi yapmak zorunda değilsin zaten bunun farkındasın, hayatta en önemli olan şey senin öz mutluluğun ve unutma ki hayatta kader veya seçimlerimiz kararlarımız sonucunda başımıza ne gelirse gelsin ben her halükarda senin yanındayım her zaman arkandayım eminim ki sen bir şeyi istediğin sürece onu yapabilecek bir kızsın ne olduğu farketmez yeter ki istemen ve bunun için çabalaman gerek her şey sende bitiyor ve sen çok güçlü bir insansın iyi ki varsın 💜",
  },
];
