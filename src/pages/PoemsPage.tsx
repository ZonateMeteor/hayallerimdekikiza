import { PageHeader } from "../components/PageHeader";
import { RandomCard } from "../components/RandomCard";
import { poems } from "../data/poems";

export function PoemsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="app-bg min-h-screen">
      <PageHeader title="Şiirler" onBack={onBack} />
      <RandomCard
        type="poem"
        items={poems}
        emptyHint="Henüz şiir yok."
        drawLabel="Rastgele şiir getir"
      />
    </div>
  );
}
