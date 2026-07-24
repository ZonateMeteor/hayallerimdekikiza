import { useEffect, useMemo, useState } from "react";
import { MenuDrawer, type Route } from "./components/MenuDrawer";
import { IntroScreen } from "./pages/IntroScreen";
import { PoemsPage } from "./pages/PoemsPage";
import { ConfessionsPage } from "./pages/ConfessionsPage";
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

  const currentTheme = useMemo(() => {
    const id = getStoredThemeId() ?? defaultThemeId;
    return themes.find((t) => t.id === id) ?? themes[0];
  }, []);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // Tema değişimi olayını dinle (ThemesPage'ten gelir)
  useEffect(() => {
    const handler = () => {
      const id = getStoredThemeId() ?? defaultThemeId;
      const t = themes.find((x) => x.id === id) ?? themes[0];
      applyTheme(t);
    };
    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  function go(r: Route) {
    setRoute(r);
  }

  function back() {
    setRoute("home");
  }

  return (
    <div className="app-bg min-h-screen">
      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={go}
        current={route}
      />

      {route === "home" && <IntroScreen onOpenMenu={() => setMenuOpen(true)} />}
      {route === "poems" && <PoemsPage onBack={back} />}
      {route === "confessions" && <ConfessionsPage onBack={back} />}
      {route === "memories" && <MemoriesPage onBack={back} />}
      {route === "music" && <MusicPage onBack={back} />}
      {route === "games" && <GamesPage onBack={back} />}
      {route === "feedback" && <FeedbackPage onBack={back} />}
      {route === "themes" && <ThemesPage onBack={back} />}
    </div>
  );
}
