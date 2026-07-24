import { PageHeader } from "../components/PageHeader";
import { RandomCard } from "../components/RandomCard";
import { confessions } from "../data/confessions";

export function ConfessionsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="app-bg min-h-screen">
      <PageHeader title="İtiraflar" onBack={onBack} />
      <RandomCard
        type="confession"
        items={confessions}
        emptyHint="Henüz itiraf yok."
        drawLabel="Rastgele itiraf getir"
      />
    </div>
  );
}
