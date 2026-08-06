import { useEffect, useMemo, useState, useRef } from "react";
import { MenuDrawer, type Route } from "./components/MenuDrawer";
import { IntroScreen } from "./pages/IntroScreen";
import { PoemsPage } from "./pages/PoemsPage";
import { MemoriesPage } from "./pages/MemoriesPage";
import { MusicPage } from "./pages/MusicPage";
import { GamesPage } from "./pages/GamesPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { ThemesPage } from "./pages/ThemesPage";
import { themes, defaultThemeId } from "./data/themes";
import { applyTheme, getStoredThemeId, setStoredThemeId } from "./lib/theme";

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Müzik için gerekli state ve referanslar
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTheme = useMemo(() => {
    const id = getStoredThemeId() ?? defaultThemeId;
    return themes.find((t) => t.id === id) ?? themes[0];
  }, []);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const handler = () => {
      const id = getStoredThemeId() ?? defaultThemeId;
      const t = themes.find((x) => x.id === id) ?? themes[0];
      applyTheme(t);
    };
    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  // Müzik Oynatma Fonksiyonu
  const playGlobalMusic = (fileName: string) => {
    if (!audioRef.current) return;
    
    if (currentMusic === fileName) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    audioRef.current.src = `/muzik/muzikler/${fileName}`;
    audioRef.current.play().catch(() => {});
    setCurrentMusic(fileName);
    setIsPlaying(true);
  };

  function go(r: Route) {
    setRoute(r);
  }

  function back() {
    setRoute("home");
  }

  return (
    <div className="app-bg min-h-screen">
      {/* Gizli Audio Etiketi */}
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={go}
        current={route}
      />

      {route === "home" && (
        <IntroScreen 
          onOpenMenu={() => setMenuOpen(true)} 
          onStartMusic={() => playGlobalMusic("sarki2.mp3")} 
        />
      )}
      
      {route === "poems" && <PoemsPage onBack={back} />}
      {route === "memories" && <MemoriesPage onBack={back} />}
      
      {route === "music" && (
        <MusicPage 
          onBack={back} 
          globalPlayMusic={playGlobalMusic}
          currentGlobalMusic={currentMusic}
          isGlobalPlaying={isPlaying}
        />
      )}
      
      {route === "games" && <GamesPage onBack={back} />}
      {route === "feedback" && <FeedbackPage onBack={back} />}
      {route === "themes" && <ThemesPage onBack={back} />}
    </div>
  );
}
