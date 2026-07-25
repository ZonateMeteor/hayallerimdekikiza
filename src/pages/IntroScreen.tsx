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
    <div 
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-white"
      style={{ background: "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)" }}
    >
      <button
        onClick={onOpenMenu}
        className="fixed left-4 top-4 z-30 rounded-xl p-2.5 transition duration-300 hover:scale-110 hover:bg-white/10"
        style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(8px)" }}
        aria-label="Menüyü aç"
      >
        <Menu size={22} className="text-indigo-200" />
      </button>

      {/* Parçacıklar yerine Parlayan Yıldız Efektleri */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="animate-float absolute rounded-full"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: "#ffffff",
              boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.6)",
              opacity: 0.6 + (i % 4) * 0.1,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 5)}s`
            }}
          />
        ))}
      </div>

      {stage === "hello" && (
        <div className="animate-fade-in relative z-10 flex flex-col items-center gap-8">
          <button
            onClick={() => setStage("gift")}
            className="text-5xl font-extralight tracking-widest text-transparent sm:text-7xl drop-shadow-2xl transition-all duration-700 hover:scale-105"
            style={{ 
              background: "linear-gradient(to right, #e0e7ff, #a5b4fc)", 
              WebkitBackgroundClip: "text" 
            }}
          >
            merhaba...
          </button>
        </div>
      )}

      {stage === "gift" && (
        <div className="animate-fade-in-up relative z-10 flex flex-col items-center gap-6">
          <p className="text-indigo-300 text-sm uppercase tracking-[0.3em] drop-shadow-md">
            sana ufak bir hediyem var
          </p>
          <p className="text-3xl font-light tracking-widest text-indigo-100 drop-shadow-lg">{recipientName}</p>
          <GiftBox clicks={clicks} total={totalClicks} opening={false} onClick={handleGiftClick} />
          <p className="text-indigo-400 text-xs tracking-wider opacity-80">Hediye kutusuna dokun (birkaç kere)</p>
        </div>
      )}

      {stage === "opening" && (
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="text-3xl font-light tracking-widest text-indigo-100 drop-shadow-lg">{recipientName}</p>
          <GiftBox clicks={totalClicks} total={totalClicks} opening={true} onClick={() => {}} />
        </div>
      )}

      {stage === "flowers" && (
        <div className="animate-fade-in relative z-10 flex flex-col items-center gap-8">
          <Bouquet />
          <p className="text-3xl font-light tracking-widest text-indigo-100 drop-shadow-lg">{recipientName}</p>
          <button
            onClick={() => setStage("message")}
            className="animate-blink rounded-xl border px-10 py-3 text-sm font-semibold tracking-[0.2em] text-indigo-100 transition hover:bg-white/10"
            style={{ 
              borderColor: "rgba(165, 180, 252, 0.5)",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 20px rgba(165, 180, 252, 0.2)"
            }}
          >
            DEVAM ET
          </button>
        </div>
      )}

      {stage === "message" && (
        <div className="animate-fade-in-up relative z-10 max-w-xl rounded-3xl p-8 text-center sm:p-10"
             style={{ 
               background: "rgba(15, 23, 42, 0.6)", 
               backdropFilter: "blur(16px)",
               border: "1px solid rgba(255,255,255,0.1)",
               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15)"
             }}>
          <p className="whitespace-pre-line text-lg font-light leading-relaxed text-indigo-50 drop-shadow-sm">{birthdayMessage}</p>
          <p className="mt-8 text-xs tracking-wider text-indigo-300 opacity-70">
            Daha fazlası için sol üstteki menüyü açabilirsin.
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
  const lidOffset = opening ? 0 : clicks > 0 ? -8 * clicks : 0;

  return (
    <button
      onClick={onClick}
      className="relative h-40 w-48 select-none transition-transform duration-200 active:scale-95"
      style={{ touchAction: "manipulation" }}
      aria-label="Hediye kutusu"
    >
      {/* Kutu gövdesi - Derin Gece Mavisi */}
      <div
        className="absolute bottom-0 left-1/2 h-28 w-40 -translate-x-1/2 rounded-b-lg rounded-t-sm"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      />
      {/* Kurdele dikey - Gümüş/Parlak Mavi */}
      <div
        className="absolute bottom-0 left-1/2 h-28 w-5 -translate-x-1/2"
        style={{ 
          background: "linear-gradient(180deg, #c7d2fe, #818cf8)",
          boxShadow: "0 0 10px rgba(129, 140, 248, 0.3)"
        }}
      />
      {/* Kurdele yatay */}
      <div
        className="absolute bottom-12 left-1/2 h-5 w-40 -translate-x-1/2"
        style={{ 
          background: "linear-gradient(90deg, #a5b4fc, #818cf8, #a5b4fc)",
          boxShadow: "0 0 10px rgba(129, 140, 248, 0.3)"
        }}
      />
      {/* Kapak */}
      {!opening && clicks >= total ? null : (
        <div
          className={`absolute left-1/2 h-7 w-44 -translate-x-1/2 rounded-t-md ${lidClass}`}
          style={{
            top: `calc(100% - 112px + ${lidOffset}px)`,
            background: "linear-gradient(135deg, #1e293b 0%, #312e81 100%)",
            boxShadow: "0 -5px 15px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)",
            transformOrigin: "left center",
            border: "1px solid rgba(255,255,255,0.05)"
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
            className="h-6 w-12 rounded-full"
            style={{
              background: "radial-gradient(circle, #e0e7ff, #818cf8)",
              boxShadow: "0 2px 10px rgba(129, 140, 248, 0.6)",
            }}
          />
        </div>
      )}
      {/* İlerleme göstergesi - Neon Işıltılı */}
      {clicks > 0 && clicks < total && !opening && (
        <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i < clicks ? "16px" : "6px",
                background: i < clicks ? "#818cf8" : "rgba(255, 255, 255, 0.1)",
                boxShadow: i < clicks ? "0 0 8px rgba(129, 140, 248, 0.8)" : "none"
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
      {/* Düşen taç yaprakları (Yıldız tozları gibi) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="animate-petal absolute rounded-full"
          style={{
            left: `${15 + i * 8}%`,
            top: `${5 + (i % 4) * 20}%`,
            width: `${4 + (i % 3)}px`,
            height: `${4 + (i % 3)}px`,
            background: "#c7d2fe",
            boxShadow: "0 0 6px rgba(199, 210, 254, 0.8)",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      {/* Çiçekler */}
      {flowerPositions.map((f, i) => (
        <Flower key={i} x={f.x} y={f.y} size={f.size} delay={i * 0.1} />
      ))}
      {/* Bükülmüş kağıt - Zarif Gece Mavisi Cam Efekti */}
      <div
        className="absolute bottom-0 left-1/2 h-16 w-32 -translate-x-1/2 rounded-b-2xl"
        style={{
          background: "linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
          backdropFilter: "blur(4px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
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
      {/* Yapraklar - Yıldız Işıltılı Mavi/Mor Tonları */}
      {[0, 72, 144, 216, 288].map((rot) => (
        <span
          key={rot}
          className="absolute rounded-full"
          style={{
            width: "60%",
            height: "60%",
            left: "20%",
            top: "0%",
            background: "radial-gradient(circle, #e0e7ff 0%, #818cf8 80%)",
            transform: `rotate(${rot}deg)`,
            transformOrigin: "50% 80%",
            boxShadow: "0 0 8px rgba(129, 140, 248, 0.5)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        />
      ))}
      {/* Merkez - Parlak Gümüş/Altın */}
      <span
        className="absolute rounded-full"
        style={{
          width: "35%",
          height: "35%",
          left: "32.5%",
          top: "32.5%",
          background: "radial-gradient(circle, #ffffff 0%, #cbd5e1 100%)",
          boxShadow: "0 0 10px rgba(255,255,255,0.8)"
        }}
      />
    </div>
  );
}
