import { useState } from "react";
import { birthdayMessage, recipientName } from "../data/birthdayMessage";
import { Menu, Gift } from "lucide-react";

interface IntroScreenProps {
  onOpenMenu: () => void;
}

type Stage = "hello" | "gift" | "opening" | "flowers" | "message";

export function IntroScreen({ onOpenMenu }: IntroScreenProps) {
  const [stage, setStage] = useState<Stage>("hello");
  const [clicks, setClicks] = useState(0);
  const totalClicks = 7;

  function handleGiftClick() {
    const next = clicks + 1;
    setClicks(next);
    if (next >= totalClicks) {
      setStage("opening");
      setTimeout(() => setStage("flowers"), 900);
    }
  }

  return (
    <div className="app-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <button
        onClick={onOpenMenu}
        className="surface surface-hover fixed left-4 top-4 z-30 rounded-xl p-2.5 transition"
        aria-label="Menüyü aç"
      >
        <Menu size={22} />
      </button>

      {/* Dekoratif arka plan parçacıkları */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="animate-float absolute rounded-full"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              background: "var(--accent)",
              opacity: 0.25,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {stage === "hello" && (
        <div className="animate-fade-in relative z-10 flex flex-col items-center gap-8">
          <button
            onClick={() => setStage("gift")}
            className="text-5xl font-light tracking-tight sm:text-7xl"
          >
            merhaba...
          </button>
        </div>
      )}

      {stage === "gift" && (
        <div className="animate-fade-in-up relative z-10 flex flex-col items-center gap-6">
          <p className="text-muted text-sm uppercase tracking-widest">
            sana ufak bir hediyem var
          </p>
          <p className="text-2xl font-light tracking-wide">{recipientName}</p>
          <GiftBox clicks={clicks} total={totalClicks} opening={false} onClick={handleGiftClick} />
          <p className="text-muted text-xs">Hediye kutusuna dokun(bir kaç kere)</p>
        </div>
      )}

      {stage === "opening" && (
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="text-2xl font-light tracking-wide">{recipientName}</p>
          <GiftBox clicks={totalClicks} total={totalClicks} opening={true} onClick={() => {}} />
        </div>
      )}

      {stage === "flowers" && (
        <div className="animate-fade-in relative z-10 flex flex-col items-center gap-8">
          <Bouquet />
          <p className="text-2xl font-light tracking-wide">{recipientName}</p>
          <button
            onClick={() => setStage("message")}
            className="animate-blink surface rounded-xl border-2 px-8 py-3 text-sm font-semibold tracking-widest"
            style={{ borderColor: "var(--primary)" }}
          >
            DEVAM ET
          </button>
        </div>
      )}

      {stage === "message" && (
        <div className="animate-fade-in-up surface relative z-10 max-w-xl rounded-3xl p-8 text-center shadow-2xl sm:p-10">
          <p className="whitespace-pre-line text-lg leading-relaxed">{birthdayMessage}</p>
          <p className="text-muted mt-6 text-sm">
            Daha fazlası için sol üstteki üç çizgiye basarak menüyü açabilirsin.
          </p>
        </div>
      )}
    </div>
  );
}

function GiftBox({
  clicks,
  total,
  opening,
  onClick,
}: {
  clicks: number;
  total: number;
  opening: boolean;
  onClick: () => void;
}) {
  const progress = clicks / total;
  const lidClass = opening ? "animate-lid-fall" : clicks > 0 ? "animate-lid-lift" : "";
  // Kapağın ne kadar açıldığı (ilk birkaç tıklamada kısmen açılır)
  const lidOffset = opening ? 0 : clicks > 0 ? -8 * clicks : 0;

  return (
    <button
      onClick={onClick}
      className="relative h-40 w-48 select-none"
      style={{ touchAction: "manipulation" }}
      aria-label="Hediye kutusu"
    >
      {/* Kutu gövdesi */}
      <div
        className="absolute bottom-0 left-1/2 h-28 w-40 -translate-x-1/2 rounded-b-lg rounded-t-sm"
        style={{
          background: "linear-gradient(135deg, #7c2d12 0%, #b45309 100%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      />
      {/* Kurdele dikey */}
      <div
        className="absolute bottom-0 left-1/2 h-28 w-5 -translate-x-1/2"
        style={{ background: "linear-gradient(180deg, #fbbf24, #f59e0b)" }}
      />
      {/* Kurdele yatay */}
      <div
        className="absolute bottom-12 left-1/2 h-5 w-40 -translate-x-1/2"
        style={{ background: "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)" }}
      />
      {/* Kapak */}
      {!opening && clicks >= total ? null : (
        <div
          className={`absolute left-1/2 h-7 w-44 -translate-x-1/2 rounded-t-md ${lidClass}`}
          style={{
            top: `calc(100% - 112px + ${lidOffset}px)`,
            background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.3)",
            transformOrigin: "left center",
          }}
        />
      )}
      {/* Kurdele bağcı */}
      {clicks < total && !opening && (
        <div
          className="absolute left-1/2 top-[calc(100%-120px)] -translate-x-1/2"
          style={{ transform: `translateX(-50%) translateY(${lidOffset}px)` }}
        >
          <div
            className="h-6 w-10 rounded-full"
            style={{
              background: "radial-gradient(circle, #fbbf24, #f59e0b)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      )}
      {/* İlerleme göstergesi */}
      {clicks > 0 && clicks < total && !opening && (
        <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i < clicks ? "16px" : "8px",
                background: i < clicks ? "var(--primary)" : "var(--border)",
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
}

function Bouquet() {
  return (
    <div className="animate-bouquet relative h-44 w-56">
      {/* Düşen taç yaprakları */}
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="animate-petal absolute rounded-full"
          style={{
            left: `${20 + i * 12}%`,
            top: `${10 + (i % 3) * 20}%`,
            width: "10px",
            height: "10px",
            background: "#a855f7",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      {/* Çiçekler */}
      {flowerPositions.map((f, i) => (
        <Flower key={i} x={f.x} y={f.y} size={f.size} delay={i * 0.1} />
      ))}
      {/* Bükülmüş kağıt */}
      <div
        className="absolute bottom-0 left-1/2 h-16 w-32 -translate-x-1/2 rounded-b-2xl"
        style={{
          background: "linear-gradient(180deg, #6d28d9 0%, #4c1d95 100%)",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </div>
  );
}

const flowerPositions = [
  { x: 50, y: 20, size: 48 },
  { x: 28, y: 35, size: 40 },
  { x: 72, y: 35, size: 40 },
  { x: 38, y: 55, size: 34 },
  { x: 62, y: 55, size: 34 },
  { x: 50, y: 48, size: 42 },
];

function Flower({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: "translate(-50%, -50%)",
        animation: `bouquetRise 0.9s ease forwards`,
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      {/* Yapraklar */}
      {[0, 72, 144, 216, 288].map((rot) => (
        <span
          key={rot}
          className="absolute rounded-full"
          style={{
            width: "60%",
            height: "60%",
            left: "20%",
            top: "0%",
            background: "radial-gradient(circle, #c084fc 0%, #a855f7 70%)",
            transform: `rotate(${rot}deg)`,
            transformOrigin: "50% 80%",
            boxShadow: "0 0 4px rgba(168,85,247,0.4)",
          }}
        />
      ))}
      {/* Merkez */}
      <span
        className="absolute rounded-full"
        style={{
          width: "30%",
          height: "30%",
          left: "35%",
          top: "35%",
          background: "radial-gradient(circle, #fbbf24, #f59e0b)",
        }}
      />
    </div>
  );
}
