import { PageHeader } from "../components/PageHeader";
import { themes } from "../data/themes";
import { applyTheme, getStoredThemeId, setStoredThemeId } from "../lib/theme";
import { Check } from "lucide-react";

export function ThemesPage({ onBack }: { onBack: () => void }) {
  const currentId = getStoredThemeId() ?? themes[0].id;

  function select(id: string) {
    const theme = themes.find((t) => t.id === id);
    if (!theme) return;
    applyTheme(theme);
    setStoredThemeId(id);
    // Re-render için state benzeri tetikleyici
    window.dispatchEvent(new Event("theme-changed"));
  }

  return (
    <div className="app-bg min-h-screen">
      <PageHeader title="Temalar" onBack={onBack} />
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <p className="text-muted mb-6 text-sm">
          Arka plan temasını değiştir. Tüm menüler karanlık kalır, sadece arka plan ve renkler değişir.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {themes.map((t) => {
            const active = t.id === currentId;
            return (
              <button
                key={t.id}
                onClick={() => select(t.id)}
                className="surface surface-hover relative overflow-hidden rounded-2xl p-5 text-left transition"
                style={active ? { boxShadow: "0 0 0 2px var(--primary)" } : undefined}
              >
                <div className="mb-3 flex gap-2">
                  <span className="h-10 w-10 rounded-lg" style={{ background: t.bg }} />
                  <span className="h-10 w-10 rounded-lg" style={{ background: t.primary }} />
                  <span className="h-10 w-10 rounded-lg" style={{ background: t.accent }} />
                  <span className="h-10 w-10 rounded-lg" style={{ background: t.surface }} />
                </div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-muted mt-1 text-xs">{t.description}</p>
                {active && (
                  <span className="bg-primary absolute right-3 top-3 rounded-full p-1 text-white">
                    <Check size={14} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
