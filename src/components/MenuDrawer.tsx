import { useEffect, useState } from "react";
import { Menu, X, Home, BookOpen, MessageCircleHeart, Clock, Music, Gamepad2, MessageSquareText, Palette } from "lucide-react";

export type Route =
  | "home"
  | "poems"
  | "confessions"
  | "memories"
  | "music"
  | "games"
  | "feedback"
  | "themes";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (route: Route) => void;
  current: Route;
}

const items: { route: Route; label: string; icon: React.ElementType }[] = [
  { route: "home", label: "Anasayfa", icon: Home },
  { route: "poems", label: "Şiirler", icon: BookOpen },
  { route: "confessions", label: "İtiraflar", icon: MessageCircleHeart },
  { route: "memories", label: "Anılar", icon: Clock },
  { route: "music", label: "Müzikler", icon: Music },
  { route: "games", label: "Sıkıldıysan Tıkla", icon: Gamepad2 },
  { route: "feedback", label: "Geri Bildirim", icon: MessageSquareText },
  { route: "themes", label: "Temalar", icon: Palette },
];

export function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="surface surface-hover fixed left-4 top-4 z-30 rounded-xl p-2.5 transition"
      aria-label="Menüyü aç"
    >
      <Menu size={22} />
    </button>
  );
}

export function MenuDrawer({ open, onClose, onNavigate, current }: MenuDrawerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      const t = setTimeout(() => setShow(false), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open && !show) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      />
      <aside
        className={`surface absolute left-0 top-0 h-full w-72 max-w-[80vw] p-5 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ borderRight: "1px solid var(--border)" }}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm tracking-widest text-muted uppercase">Menü</span>
          <button onClick={onClose} className="surface surface-hover rounded-lg p-2" aria-label="Kapat">
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {items.map(({ route, label, icon: Icon }) => {
            const active = current === route;
            return (
              <button
                key={route}
                onClick={() => {
                  onNavigate(route);
                  onClose();
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                  active ? "bg-primary text-white" : "surface surface-hover"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
