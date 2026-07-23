import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { SnakeGame } from "../components/games/SnakeGame";
import { Game2048 } from "../components/games/Game2048";
import { Gamepad2, ArrowLeft } from "lucide-react";

type Game = "menu" | "snake" | "2048";

export function GamesPage({ onBack }: { onBack: () => void }) {
  const [game, setGame] = useState<Game>("menu");

  return (
    <div className="app-bg min-h-screen">
      <PageHeader
        title="Oyunlar"
        onBack={game === "menu" ? onBack : () => setGame("menu")}
      />
      <div className="mx-auto w-full max-w-md px-4 py-8">
        {game === "menu" && (
          <div className="flex flex-col gap-4">
            <p className="text-muted text-center text-sm">Bir oyun seç ve oyna. Skorlar kaydedilir.</p>
            <button
              onClick={() => setGame("snake")}
              className="surface surface-hover flex items-center gap-4 rounded-2xl p-5 text-left transition"
            >
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl text-white">
                <Gamepad2 size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Yılan</h3>
                <p className="text-muted text-xs">Yemleri ye, büyü, duvara çarpma.</p>
              </div>
            </button>
            <button
              onClick={() => setGame("2048")}
              className="surface surface-hover flex items-center gap-4 rounded-2xl p-5 text-left transition"
            >
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl text-white">
                <span className="text-sm font-bold">2048</span>
              </div>
              <div>
                <h3 className="font-semibold">2048</h3>
                <p className="text-muted text-xs">Aynı sayıları birleştir, 2048'e ulaş.</p>
              </div>
            </button>
          </div>
        )}
        {game === "snake" && <SnakeGame onExit={() => setGame("menu")} />}
        {game === "2048" && <Game2048 onExit={() => setGame("menu")} />}
      </div>
    </div>
  );
}
