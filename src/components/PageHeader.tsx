import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
}

export function PageHeader({ title, onBack, right }: PageHeaderProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && e.target === document.body) onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBack]);

  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--surface) 80%, transparent)" }}
    >
      <button
        onClick={onBack}
        className="surface surface-hover rounded-full p-2 transition"
        aria-label="Geri"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-lg font-semibold tracking-wide">{title}</h1>
      <div className="ml-auto">{right}</div>
    </header>
  );
}
