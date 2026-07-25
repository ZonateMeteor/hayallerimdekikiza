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
      setTimeout(() => setStage("flowers"), 1500); // Daha yavaş bir açılış hissi
    }
  }

  return (
    <div 
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-white"
      style={{ background: "radial-gradient(ellipse at center, #2e1065 0%, #1e1b4b 100%)" }} // Derin gizemli mor-indigo
    >
      <button
        onClick={onOpenMenu}
        className="fixed left-4 top-4 z-30 rounded-xl p-2.5 transition duration-500 hover:scale-110"
        style={{ 
          background: "rgba(255, 255, 255, 0.03)", 
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 15px rgba(165, 180, 252, 0.1)"
        }}
        aria-label="Menüyü aç"
      >
        <Menu size={22} className="text-violet-200" />
      </button>

      {/* Kristal Işıltı Efektleri (Yıldızlar yerine) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="animate-glimmer absolute"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: `${1 + (i % 2)}px`,
              height: `${1 + (i % 2)}px`,
              background: i % 2 === 0 ? "#ffffff" : "#c7d2fe", // Beyaz ve uçuk mavi kristaller
              boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.4)",
              opacity: 0.4 + (i % 4) * 0.1,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${4 + (i % 6)}s`
            }}
          />
        ))}
      </div>

      {stage === "hello" && (
        <div className="animate-fade-in relative z-10 flex flex-col items-center gap-8">
          <button
            onClick={() => setStage("gift")}
            className="text-5xl font-thin tracking-widest text-transparent sm:text-7xl drop-shadow-lg transition-all duration-1000 hover:scale-105 hover:tracking-[0.25em]"
            style={{ 
              background: "linear-gradient(to right, #c7d2fe 0%, #e0e7ff 50%, #c7d2fe 100%)", 
              WebkitBackgroundClip: "text",
              textShadow: "0 0 10px rgba(199, 210, 254, 0.3)"
            }}
          >
            merhaba...
          </button>
        </div>
      )}

      {stage === "gift" && (
        <div className="animate-fade-in-up relative z-10 flex flex-col items-center gap-6">
          <p className="text-violet-300 text-sm uppercase tracking-[0.4em] drop-shadow-sm">
            sana ufak bir hediyem var
          </p>
          <p className="text-3xl font-extralight tracking-widest text-violet-100 drop-shadow-md">{recipientName}</p>
          <GiftBox clicks={clicks} total={totalClicks} opening={false} onClick={handleGiftClick} />
          <p className="text-violet-400 text-xs tracking-wider opacity-90 animate-blink-slow">Hediye kutusuna dokun (birkaç kere)</p>
        </div>
      )}

      {stage === "opening" && (
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="text-3xl font-extralight tracking-widest text-violet-100 drop-shadow-md">{recipientName}</p>
          <GiftBox clicks={totalClicks} total={totalClicks} opening={true} onClick={() => {}} />
        </div>
      )}

      {stage === "flowers" && (
        <div className="animate-fade-in relative z-10 flex flex-col items-center gap-8">
          <Bouquet />
          <p className="text-3xl font-extralight tracking-widest text-violet-100 drop-shadow-md">{recipientName}</p>
          <button
            onClick={() => setStage("message")}
            className="rounded-xl border px-10 py-3 text-sm font-semibold tracking-[0.2em] text-violet-100 transition duration-300 hover:bg-white/10"
            style={{ 
              borderColor: "rgba(165, 180, 252, 0.3)",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 25px rgba(165, 180, 252, 0.1), inset 0 0 5px rgba(255,255,255,0.1)"
            }}
          >
            DEVAM ET
          </button>
        </div>
      )}

      {stage === "message" && (
        <div className="animate-fade-in-up relative z-10 max-w-xl rounded-3xl p-8 text-center sm:p-10"
             style={{ 
               background: "rgba(15, 23, 42, 0.4)", // Daha ince bir arka plan
               backdropFilter: "blur(20px)", // Daha yoğun bulanıklık
               border: "1px solid rgba(255,255,255,0.05)",
               boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.1)"
             }}>
          <p className="whitespace-pre-line text-lg font-extralight leading-relaxed text-violet-50 drop-shadow-sm font-antique">{birthdayMessage}</p>
          <p className="mt-8 text-xs tracking-wider text-violet-300 opacity-80">
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
      className="relative h-40 w-48 select-none transition-transform duration-300 active:scale-95"
      style={{ touchAction: "manipulation" }}
      aria-label="Hediye kutusu"
    >
      {/* Kutu gövdesi - Antik Metalik Görünüm */}
      <div
        className="absolute bottom-0 left-1/2 h-28 w-40 -translate-x-1/2 rounded-b-lg rounded-t-sm"
        style={{
          background: "linear-gradient(135deg, #020617 0%, #1e1b4b 100%)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.7), inset 0 2px 8px rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.03)"
        }}
      />
      {/* Kurdele dikey - İpek Mavi-Violet */}
      <div
        className="absolute bottom-0 left-1/2 h-28 w-5 -translate-x-1/2"
        style={{ 
          background: "linear-gradient(180deg, #a5b4fc, #6366f1)",
          boxShadow: "0 0 8px rgba(99, 102, 241, 0.2)",
          width: "4px" // Daha ince kurdele
        }}
      />
      {/* Kurdele yatay */}
      <div
        className="absolute bottom-12 left-1/2 h-5 w-40 -translate-x-1/2"
        style={{ 
          background: "linear-gradient(90deg, #c7d2fe, #6366f1, #c7d2fe)",
          boxShadow: "0 0 8px rgba(99, 102, 241, 0.2)",
          height: "4px" // Daha ince kurdele
        }}
      />
      {/* Kapak */}
      {!opening && clicks >= total ? null : (
        <div
          className={`absolute left-1/2 h-7 w-44 -translate-x-1/2 rounded-t-md ${lidClass}`}
          style={{
            top: `calc(100% - 112px + ${lidOffset}px)`,
            background: "linear-gradient(135deg, #1e293b 0%, #312e81 100%)",
            boxShadow: "0 -8px 20px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)",
            transformOrigin: "left center",
            border: "1px solid rgba(255,255,255,0.03)"
          }}
        />
      )}
      {/* Kurdele bağcı - Daha Zarif */}
      {clicks < total && !opening && (
        <div
          className="absolute left-1/2 top-[calc(100%-120px)] -translate-x-1/2"
          style={{ transform: `translateX(-50%) translateY(${lidOffset}px)` }}
        >
          <div
            className="h-6 w-10 rounded-full"
            style={{
              background: "radial-gradient(circle, #e0e7ff, #6366f1)",
              boxShadow: "0 2px 8px rgba(99, 102, 241, 0.4)",
            }}
          />
        </div>
      )}
      {/* İlerleme göstergesi - Kristal Noktalar */}
      {clicks > 0 && clicks < total && !opening && (
        <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full transition-all duration-500"
              style={{
                background: i < clicks ? "#c7d2fe" : "rgba(255, 255, 255, 0.05)",
                boxShadow: i < clicks ? "0 0 10px rgba(199, 210, 254, 1)" : "none",
                transform: i < clicks ? "scale(1.2)" : "scale(1)"
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
      {/* Düşen taç yaprakları (Daha Yavaş ve Süzülen) */}
      {Array.from({ length: 15 }).map((_, i) => (
        <span
          key={i}
          className="animate-petal-slow absolute rounded-full"
          style={{
            left: `${10 + i * 7}%`,
            top: `${5 + (i % 5) * 18}%`,
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
            background: "#c7d2fe",
            boxShadow: "0 0 5px rgba(199, 210, 254, 0.7)",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      {/* Çiçekler */}
      {flowerPositions.map((f, i) => (
        <Flower key={i} x={f.x} y={f.y} size={f.size} delay={i * 0.15} /> // Biraz daha yavaş çiçek açılışı
      ))}
      {/* Bükülmüş kağıt - Zarif Gece Mavisi Cam Efekti */}
      <div
        className="absolute bottom-0 left-1/2 h-16 w-32 -translate-x-1/2 rounded-b-2xl"
        style={{
          background: "linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)",
          backdropFilter: "blur(6px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.6)"
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
        animation: `bouquetRiseRadial 1.2s ease-out forwards`, // Dairesel açılış
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      {/* Yapraklar - Rüya Gibi Mor-Violet Tonları */}
      {[0, 72, 144, 216, 288].map((rot) => (
        <span
          key={rot}
          className="absolute rounded-full"
          style={{
            width: "60%",
            height: "60%",
            left: "20%",
            top: "0%",
            background: "radial-gradient(circle, #e9d5ff 0%, #a855f7 70%)", // Daha yumuşak mor
            transform: `rotate(${rot}deg)`,
            transformOrigin: "50% 80%",
            boxShadow: "0 0 10px rgba(168, 85, 247, 0.4)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        />
      ))}
      {/* Merkez - Parlak Gümüş/Kristal */}
      <span
        className="absolute rounded-full"
        style={{
          width: "35%",
          height: "35%",
          left: "32.5%",
          top: "32.5%",
          background: "radial-gradient(circle, #ffffff 0%, #cbd5e1 100%)",
          boxShadow: "0 0 12px rgba(255,255,255,0.9)"
        }}
      />
    </div>
  );
}
