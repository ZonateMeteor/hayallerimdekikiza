import { useState } from "react";
import { birthdayMessage, recipientName } from "../data/birthdayMessage";
import { Menu } from "lucide-react";

interface IntroScreenProps {
  onOpenMenu: () => void;
  onStartMusic: () => void;
}

type Stage = "hello" | "gift" | "opening" | "flowers" | "message";

export function IntroScreen({ onOpenMenu, onStartMusic }: IntroScreenProps) {
  const [stage, setStage] = useState<Stage>("hello");
  const [clicks, setClicks] = useState(0);
  const totalClicks = 7;

  function handleGiftClick() {
    const next = clicks + 1;
    setClicks(next);
    if (next >= totalClicks) {
      setStage("opening");
      setTimeout(() => setStage("flowers"), 1500);
    }
  }

  return (
    <>
      <style>{`
        @keyframes bloomStagger {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; filter: blur(4px); }
          70% { transform: scale(1.08) rotate(3deg); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px); }
        }
        @keyframes floatDust {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-120px) scale(0.2); opacity: 0; }
        }
        @keyframes boxShake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-4deg) scale(1.05); }
          40% { transform: rotate(4deg) scale(1.05); }
          60% { transform: rotate(-2deg) scale(1.03); }
          80% { transform: rotate(2deg) scale(1.03); }
        }
        @keyframes lidFly {
          0% { transform: translateY(0) rotate(0) scale(1); opacity: 1; }
          100% { transform: translateY(-140px) rotate(25deg) scale(1.2); opacity: 0; }
        }
        @keyframes boxFade {
          0% { opacity: 1; transform: scale(1); filter: brightness(1); }
          100% { opacity: 0; transform: scale(0.4); filter: brightness(2.5); }
        }
        @keyframes ambientGlow {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.25); opacity: 0.45; }
        }
        @keyframes bouquetEntry {
          0% { opacity: 0; transform: scale(0.6) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gentleSway {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
      `}</style>

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#05030a] px-4 font-sans text-white">
        {/* TAM EKRAN ARKA PLAN ANİMASYONU VE IŞILTILAR */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/25 blur-[160px]"
            style={{ animation: "ambientGlow 8s infinite ease-in-out" }}
          />
          <div
            className="absolute top-1/3 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/15 blur-[140px]"
            style={{ animation: "ambientGlow 10s infinite ease-in-out 2s" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#05030a]/70 to-[#05030a]" />

          {/* Uçuşan Parçacıklar */}
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={`dust-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
                width: `${(i % 3) + 1.5}px`,
                height: `${(i % 3) + 1.5}px`,
                backgroundColor: i % 2 === 0 ? "#e879f9" : "#c084fc",
                animation: `floatDust ${3 + (i % 4)}s infinite ease-out`,
                animationDelay: `${(i * 0.2) % 3}s`,
                boxShadow: "0 0 8px rgba(232, 121, 249, 0.8)",
              }}
            />
          ))}
        </div>

        {/* MENÜ BUTONU */}
        <button
          onClick={onOpenMenu}
          className="fixed left-4 top-4 z-30 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10"
          aria-label="Menüyü aç"
        >
          <Menu size={24} className="text-purple-200" />
        </button>

        {/* STAGE: HELLO */}
        {stage === "hello" && (
          <div className="relative z-10 flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-1000">
            <button
              onClick={() => {
                setStage("gift");
                onStartMusic();
              }}
              className="text-5xl font-light tracking-[0.2em] text-transparent transition-all duration-700 hover:scale-105 hover:tracking-[0.3em] sm:text-7xl"
              style={{
                background: "linear-gradient(to right, #e9d5ff, #f3e8ff, #c084fc)",
                WebkitBackgroundClip: "text",
                textShadow: "0 0 50px rgba(216, 180, 254, 0.5)",
              }}
            >
              merhaba...
            </button>
          </div>
        )}

        {/* STAGE: GIFT */}
        {stage === "gift" && (
          <div className="relative z-10 flex flex-col items-center gap-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-purple-300">
              sana ufak bir hediyem varrrr
            </p>
            <p className="text-4xl font-extralight tracking-widest text-purple-100">{recipientName}</p>
            <GiftBox clicks={clicks} total={totalClicks} opening={false} onClick={handleGiftClick} />
            <p className="text-xs tracking-widest text-purple-300 opacity-70">Kutuyu açmak için dokun</p>
          </div>
        )}

        {/* STAGE: OPENING */}
        {stage === "opening" && (
          <div className="relative z-10 flex flex-col items-center gap-8">
            <p className="text-4xl font-extralight tracking-widest text-purple-100">{recipientName}</p>
            <GiftBox clicks={totalClicks} total={totalClicks} opening={true} onClick={() => {}} />
          </div>
        )}

        {/* STAGE: FLOWERS */}
        {stage === "flowers" && (
          <div className="relative z-10 flex w-full max-w-lg flex-col items-center justify-center gap-6 text-center animate-in fade-in duration-1000">
            <BouquetScene />
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-light tracking-[0.35em] text-purple-200">BU ÇİÇEKLER SANA &lt;3</p>
              <p className="text-3xl font-extralight tracking-widest text-purple-100">{recipientName}</p>
            </div>

            <button
              onClick={() => setStage("message")}
              className="group relative mt-2 overflow-hidden rounded-full border border-purple-400/30 bg-purple-900/30 px-10 py-3.5 text-xs font-bold tracking-[0.3em] text-purple-100 backdrop-blur-md transition-all hover:border-purple-400/60 hover:bg-purple-800/40 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
            >
              <span className="relative z-10">DEVAM ET</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>
          </div>
        )}

        {/* STAGE: MESSAGE */}
        {stage === "message" && (
          <div className="relative z-10 max-w-xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_0_60px_rgba(88,28,135,0.4)] backdrop-blur-2xl animate-in slide-in-from-bottom-10 fade-in duration-1000 sm:p-12">
            <p className="whitespace-pre-line text-xl font-light leading-loose text-purple-50">{birthdayMessage}</p>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <p className="mt-8 text-xs font-semibold tracking-widest text-purple-400/60">
              DAHA FAZLASI İÇİN MENÜYÜ KULLANABİLİRSİN
            </p>
          </div>
        )}
      </div>
    </>
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
  const isShaking = clicks > 0 && !opening;

  return (
    <button
      onClick={onClick}
      className="relative z-20 flex h-56 w-56 items-center justify-center transition-transform active:scale-95"
      style={{ animation: isShaking ? "boxShake 0.4s ease-in-out" : "none" }}
      aria-label="Hediye kutusu"
    >
      <div className={`h-full w-full ${opening ? "pointer-events-none" : ""}`} style={{ animation: opening ? "boxFade 0.8s forwards 0.3s" : "none" }}>
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_15px_35px_rgba(147,51,234,0.6)]">
          <circle cx="100" cy="110" r="75" fill="#a855f7" opacity={0.05 + clicks * 0.12} className="transition-opacity duration-300" />
          <path d="M 40 85 L 160 85 L 145 160 L 55 160 Z" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
          <path d="M 40 85 L 100 120 L 160 85" fill="none" stroke="#c084fc" strokeWidth="1.5" opacity="0.6" />
          <path d="M 100 120 L 100 160" fill="none" stroke="#c084fc" strokeWidth="1.5" opacity="0.6" />
          <g style={{ animation: opening ? "lidFly 1s forwards cubic-bezier(0.16, 1, 0.3, 1)" : "none", transformOrigin: "center" }}>
            <path d="M 25 65 Q 100 30 175 65 L 160 85 L 40 85 Z" fill="#3b0764" stroke="#d8b4fe" strokeWidth="2" />
            <polygon points="100,65 115,80 100,95 85,80" fill="#f3e8ff" />
            <polygon points="100,70 110,80 100,90 90,80" fill="#a855f7" className="animate-pulse" />
          </g>
          {clicks > 0 && !opening && <circle cx="100" cy="80" r={20 + clicks * 7} fill="none" stroke="#e9d5ff" strokeWidth="1.5" opacity="0.6" className="animate-ping" />}
        </svg>
      </div>

      {!opening && clicks > 0 && clicks < total && (
        <div className="absolute -bottom-8 flex gap-3">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rotate-45 transition-all duration-500 ${i < clicks ? "scale-125 bg-purple-300 shadow-[0_0_12px_#d8b4fe]" : "scale-100 border border-white/20 bg-white/10"}`}
            />
          ))}
        </div>
      )}
    </button>
  );
}

// === ORANTILI VE ORTALANMIŞ BUKET SCENE (400x480 Koordinat Sistemi) ===
function BouquetScene() {
  // Buket dügüm noktası: (200, 340)
  const knotX = 200;
  const knotY = 340;

  const flowers = [
    { x: 200, y: 120, cx: 200, cy: 220, size: 1.25, color: "#9333ea", delay: 0.0, rotation: 0 },
    { x: 140, y: 150, cx: 160, cy: 230, size: 1.1, color: "#7c3aed", delay: 0.1, rotation: -12 },
    { x: 260, y: 150, cx: 240, cy: 230, size: 1.1, color: "#8b5cf6", delay: 0.2, rotation: 12 },
    { x: 90,  y: 200, cx: 130, cy: 260, size: 0.95, color: "#a855f7", delay: 0.3, rotation: -22 },
    { x: 310, y: 200, cx: 270, cy: 260, size: 0.95, color: "#c084fc", delay: 0.4, rotation: 22 },
    { x: 195, y: 205, cx: 200, cy: 270, size: 1.2, color: "#d946ef", delay: 0.5, rotation: 5 },
    { x: 145, y: 245, cx: 170, cy: 290, size: 1.0, color: "#7c3aed", delay: 0.6, rotation: -10 },
    { x: 255, y: 245, cx: 230, cy: 290, size: 1.0, color: "#a855f7", delay: 0.7, rotation: 10 },
  ];

  const leaves = [
    { x: 110, y: 280, scale: 1, rotation: -45 },
    { x: 290, y: 280, scale: 1, rotation: 45 },
    { x: 75,  y: 230, scale: 0.85, rotation: -60 },
    { x: 325, y: 230, scale: 0.85, rotation: 60 },
  ];

  return (
    <div
      className="relative flex h-[380px] w-full max-w-[360px] items-center justify-center overflow-visible"
      style={{ animation: "bouquetEntry 1s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
    >
      <svg viewBox="0 0 400 480" className="h-full w-full overflow-visible drop-shadow-[0_15px_35px_rgba(147,51,234,0.35)]">
        <defs>
          <linearGradient id="wrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="60%" stopColor="#581c87" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>

        {/* YAPRAKLAR */}
        {leaves.map((leaf, i) => (
          <g
            key={`leaf-${i}`}
            transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotation}) scale(${leaf.scale})`}
            style={{ animation: `gentleSway 5s ease-in-out ${i * 0.3}s infinite alternate` }}
          >
            <path d="M 0 0 C 25 -20 45 0 25 35 C 5 45 -10 25 0 0 Z" fill="url(#leafGrad)" opacity="0.9" />
            <path d="M 0 0 C 12 5 18 18 20 30" stroke="#bbf7d0" strokeWidth="1.2" opacity="0.5" fill="none" />
          </g>
        ))}

        {/* SAPLAR (Düğüm noktasından çiçeğe doğru çekilen eğriler) */}
        {flowers.map((f, i) => (
          <path
            key={`stem-${i}`}
            d={`M ${knotX} ${knotY} Q ${f.cx} ${f.cy} ${f.x} ${f.y}`}
            stroke="#166534"
            strokeWidth={f.size * 3.5}
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        ))}

        {/* BUKET AMBALAJI (WRAPPER) */}
        <g>
          {/* Arka Ambalaj Katmanı */}
          <path d="M 120 290 Q 200 330 280 290 L 235 450 Q 200 460 165 450 Z" fill="#2e1065" opacity="0.95" />
          {/* Ön Ambalaj Katmanı */}
          <path d="M 125 300 Q 200 340 275 300 L 230 445 Q 200 455 170 445 Z" fill="url(#wrapGrad)" />
          {/* Katlama Çizgileri */}
          <path d="M 125 300 L 200 450 L 275 300" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.3" />
          {/* Kurdele ve Fiyonk */}
          <ellipse cx="200" cy="340" rx="22" ry="8" fill="url(#ribbonGrad)" />
          <path d="M 185 340 C 160 330 160 360 185 345 Z" fill="url(#ribbonGrad)" />
          <path d="M 215 340 C 240 330 240 360 215 345 Z" fill="url(#ribbonGrad)" />
          <path d="M 195 345 L 180 380 M 205 345 L 220 380" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* ÇİÇEKLER */}
        {flowers.map((f, i) => (
          <Flower
            key={`flower-${i}`}
            x={f.x}
            y={f.y}
            size={f.size}
            color={f.color}
            delay={f.delay}
            rotation={f.rotation}
          />
        ))}
      </svg>
    </div>
  );
}

// === CSS TRANSFORM ÇAKIŞMASI ÇÖZÜLMÜŞ ÇİÇEK BİLEŞENİ ===
function Flower({
  x,
  y,
  size,
  color,
  delay,
  rotation,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  rotation: number;
}) {
  const petals = 7;
  const petalDistance = size * 16;
  const centerRadius = size * 6;

  return (
    // Dış Grup: Konumlandırma (Translate)
    <g transform={`translate(${x}, ${y})`}>
      {/* İç Grup: Animasyon (Scale & Bloom) */}
      <g
        style={{
          animation: `bloomStagger 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards`,
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
        className="opacity-0"
      >
        <g transform={`rotate(${rotation})`}>
          {/* Taç Yapraklar */}
          {Array.from({ length: petals }).map((_, j) => {
            const angle = (j / petals) * 360;
            return (
              <g key={j} transform={`rotate(${angle}) translate(0, -${petalDistance})`}>
                <path
                  d="M 0,-15 C 12,-28 22,-12 0,15 C -22,-12 -12,-28 0,-15 Z"
                  fill={color}
                  opacity="0.9"
                />
                <path
                  d="M 0,-12 C 8,-22 15,-10 0,10 C -15,-10 -8,-22 0,-12 Z"
                  fill="#f5d0fe"
                  opacity="0.45"
                />
              </g>
            );
          })}

          {/* Çiçek Merkezi */}
          <circle cx="0" cy="0" r={centerRadius} fill="#fef08a" />
          <circle cx="0" cy="0" r={centerRadius * 0.7} fill="#f59e0b" />
          <circle cx="0" cy="0" r={centerRadius * 0.35} fill="#78350f" opacity="0.6" />
        </g>
      </g>
    </g>
  );
}
