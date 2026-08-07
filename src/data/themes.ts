// ============================================================
// TEMALAR - Bu dosyayı kolayca düzenleyebilirsin
// ============================================================
// Her tema için { id, name, description, bg, surface, text, primary, accent } ekle.
// name: Temanın görünen ismi (Türkçe olabilir)
// description: Tema açıklaması (ne hissettirdiğini yazabilirsin)
// bg: arka plan rengi, surface: kart/konteyner rengi, text: metin rengi
// primary: ana buton rengi, accent: vurgu rengi
// Renkler hex formatında olsun (örn: "#0f172a").

export interface Theme {
  id: string;
  name: string;
  description: string;
  bg: string;
  bgGradient: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  accent: string;
  border: string;
}

export const themes: Theme[] = [
  {
    id: "gece",
    name: "Gece",
    description: "Derin, karanlık ve huzurlu bir gece teması. Yıldızları andırıyor",
    bg: "#0a0a12",
    bgGradient: "radial-gradient(circle at 30% 20%, #1a1a2e 0%, #0a0a12 70%)",
    surface: "#151523",
    surfaceHover: "#1f1f33",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    primary: "#6366f1",
    primaryHover: "#818cf8",
    accent: "#22d3ee",
    border: "#2a2a40",
  },
  {
    id: "okyanus",
    name: "Saçlarının Mavisi",
    description: "Rengini tam tutturamadım ama Denizlerin ve gökyüzünün rengi.",
    bg: "#04111c",
    bgGradient: "radial-gradient(circle at 30% 20%, #0c2d52 0%, #04111c 70%)",
    surface: "#0a2540",
    surfaceHover: "#103a63",
    text: "#e0f2fe",
    textMuted: "#7dd3fc",
    primary: "#0ea5e9",
    primaryHover: "#38bdf8",
    accent: "#2dd4bf",
    border: "#134e6f",
  },
  {
    id: "orman",
    name: "Orman",
    description: "Doğanın yeşil tonları, sakinleştirici ve toprak hissi veren bir tema.",
    bg: "#0a1a0e",
    bgGradient: "radial-gradient(circle at 30% 20%, #143821 0%, #0a1a0e 70%)",
    surface: "#0f2a18",
    surfaceHover: "#1a3f28",
    text: "#ecfdf5",
    textMuted: "#86efac",
    primary: "#22c55e",
    primaryHover: "#4ade80",
    accent: "#fbbf24",
    border: "#1f5130",
  },
  {
    id: "gunbatimi",
    name: "Günbatımı",
    description: "Sıcak turuncu ve pembe tonları. daha sıcak ve biraz da Romantik hissettiriyor slfls",
    bg: "#1a0a0f",
    bgGradient: "radial-gradient(circle at 30% 20%, #3d1419 0%, #1a0a0f 70%)",
    surface: "#2a1118",
    surfaceHover: "#3d1a22",
    text: "#fef2f2",
    textMuted: "#fca5a5",
    primary: "#f43f5e",
    primaryHover: "#fb7185",
    accent: "#fb923c",
    border: "#5c1f2a",
  },
];

export const defaultThemeId = "gece";
