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
        @keyframes stemGrow {
          0% { stroke-dashoffset: var(--dash-len); opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes bloomStagger {
          0% { transform: scale(0) rotate(-18deg); opacity: 0; filter: blur(6px) drop-shadow(0 0 0px rgba(168,85,247,0)); }
          68% { transform: scale(1.08) rotate(4deg); opacity: 1; filter: blur(0px) drop-shadow(0 0 18px rgba(192,132,252,0.75)); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px) drop-shadow(0 0 10px rgba(147,51,234,0.35)); }
        }
        @keyframes floatDust {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.9; }
          100% { transform: translateY(-140px) scale(0.2); opacity: 0; }
        }
        @keyframes boxShake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-4deg) scale(1.06); }
          40% { transform: rotate(4deg) scale(1.06); }
          60% { transform: rotate(-2deg) scale(1.04); }
          80% { transform: rotate(2deg) scale(1.04); }
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
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.35; }
        }
        @keyframes bouquetSpinEntry {
          0% {
            opacity: 0;
            transform: scale(0.3) rotateY(-90deg) rotateZ(-35deg) translateY(80px);
            filter: blur(10px) brightness(0.5);
          }
          40% {
            opacity: 0.95;
            transform: scale(1.05) rotateY(12deg) rotateZ(-8deg) translateY(-10px);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg) rotateZ(0deg) translateY(0);
            filter: blur(0) brightness(1);
          }
        }
        @keyframes petalFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        @keyframes gentleSway {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
      `}</style>

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#05030a] px-6 font-sans text-white">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/20 blur-[140px]"
            style={{ animation: "ambientGlow 8s infinite ease-in-out" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#05030a]/80 to-[#05030a]" />
        </div>

        <button
          onClick={onOpenMenu}
          className="fixed left-4 top-4 z-30 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10"
          aria-label="Menüyü aç"
        >
          <Menu size={24} className="text-purple-200" />
        </button>

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

        {stage === "opening" && (
          <div className="relative z-10 flex flex-col items-center gap-8">
            <p className="text-4xl font-extralight tracking-widest text-purple-100">{recipientName}</p>
            <GiftBox clicks={totalClicks} total={totalClicks} opening={true} onClick={() => {}} />
          </div>
        )}

        {stage === "flowers" && (
          <div className="relative z-10 flex flex-col items-center gap-6 animate-in fade-in duration-1000">
            <BouquetScene />
            <p className="mt-2 text-4xl font-extralight tracking-widest text-purple-100">{recipientName}</p>
            <button
              onClick={() => setStage("message")}
              className="group relative overflow-hidden rounded-full border border-purple-400/30 bg-purple-900/20 px-12 py-4 text-sm font-bold tracking-[0.3em] text-purple-100 backdrop-blur-md transition-all hover:border-purple-400/60 hover:bg-purple-800/40 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
            >
              <span className="relative z-10">DEVAM ET</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>
          </div>
        )}

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

// === NEW REALISTIC BOUQUET SCENE ===
function BouquetScene() {
  // Flower configurations with proper stem connections
  const flowers = [
    { x: 80, y: 120, size: 1.2, color: "#8b5cf6", stemLength: 60, rotation: -10, stemCurve: -15, delay: 0.0 },
    { x: 120, y: 100, size: 1.0, color: "#7c3aed", stemLength: 70, rotation: 15, stemCurve: 10, delay: 0.1 },
    { x: 60, y: 150, size: 0.9, color: "#a855f7", stemLength: 50, rotation: -5, stemCurve: -20, delay: 0.2 },
    { x: 140, y: 140, size: 1.1, color: "#c084fc", stemLength: 65, rotation: 8, stemCurve: 15, delay: 0.3 },
    { x: 100, y: 80, size: 1.3, color: "#9333ea", stemLength: 80, rotation: 0, stemCurve: 0, delay: 0.4 },
    { x: 40, y: 110, size: 0.8, color: "#d946ef", stemLength: 55, rotation: -12, stemCurve: -10, delay: 0.5 },
    { x: 160, y: 130, size: 0.95, color: "#6d28d9", stemLength: 75, rotation: 10, stemCurve: 20, delay: 0.6 },
    { x: 90, y: 160, size: 1.0, color: "#7c3aed", stemLength: 60, rotation: -8, stemCurve: -5, delay: 0.7 },
    { x: 130, y: 90, size: 0.85, color: "#a855f7", stemLength: 70, rotation: 5, stemCurve: 8, delay: 0.8 },
    { x: 70, y: 100, size: 1.1, color: "#c084fc", stemLength: 65, rotation: -3, stemCurve: -12, delay: 0.9 },
  ];

  // Leaves for the bouquet
  const leaves = [
    { x: 70, y: 180, size: 0.8, rotation: -30 },
    { x: 130, y: 185, size: 0.9, rotation: 20 },
    { x: 50, y: 175, size: 0.7, rotation: -40 },
    { x: 150, y: 170, size: 0.85, rotation: 35 },
    { x: 100, y: 190, size: 0.75, rotation: 10 },
  ];

  // Background hearts
  const hearts = [
    { x: 25, y: 185, size: 0.5, color: "#ec4899", opacity: 0.15 },
    { x: 175, y: 195, size: 0.4, color: "#f472b6", opacity: 0.1 },
    { x: 40, y: 210, size: 0.45, color: "#ec4899", opacity: 0.12 },
    { x: 160, y: 175, size: 0.55, color: "#f472b6", opacity: 0.2 },
    { x: 100, y: 220, size: 0.4, color: "#ec4899", opacity: 0.08 },
  ];

  return (
    <div
      className="relative flex h-[560px] w-full flex-col items-center justify-end overflow-hidden"
      style={{ animation: "bouquetSpinEntry 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
    >
      {/* Soft background with glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-purple-900/5 to-[#05030a]" />
      <div
        className="absolute top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[120px]"
        style={{ animation: "ambientGlow 10s infinite ease-in-out" }}
      />

      {/* Background hearts */}
      {hearts.map((heart, i) => (
        <svg
          key={`heart-${i}`}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            transform: `translate(-50%, -50%) scale(${heart.size})`,
            opacity: heart.opacity,
            filter: 'blur(0.5px)',
          }}
        >
          <path d="M10,30 C20,0 50,0 60,30 C50,60 10,60 10,30 Z" fill={heart.color} />
        </svg>
      ))}

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={`dust-${i}`}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${(i * 17) % 95 + 2.5}%`,
            top: `${(i * 11) % 70 + 20}%`,
            width: `${(i % 3) + 1}px`,
            height: `${(i % 3) + 1}px`,
            backgroundColor: i % 2 === 0 ? "#d946ef" : "#c084fc",
            animation: `floatDust ${2.6 + (i % 5) * 0.4}s infinite ease-out`,
            animationDelay: `${i * 0.09}s`,
            boxShadow: "0 0 8px rgba(217, 70, 239, 0.7)",
          }}
        />
      ))}

      {/* Main bouquet SVG */}
      <svg viewBox="0 0 200 200" className="relative z-10 h-[400px] w-[360px] mb-10 overflow-visible">
        <defs>
          {/* Gradients for depth */}
          <linearGradient id="wrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e1065" />
            <stop offset="55%" stopColor="#5b21b6" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#14532d" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="petalGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(245,208,254,0.8)" />
            <stop offset="100%" stopColor="rgba(147,51,234,0.3)" />
          </radialGradient>
        </defs>

        {/* Bouquet wrap */}
        <g style={{ filter: "drop-shadow(0 10px 20px rgba(147,51,234,0.4))" }}>
          <path d="M 35 175 C 60 195 140 195 165 175 L 155 205 L 45 205 Z" fill="url(#wrapGrad)" opacity="0.95" />
          <path d="M 45 205 L 100 165 L 155 205" fill="none" stroke="#d8b4fe" strokeWidth="1" opacity="0.4" />
          <path d="M 50 200 C 70 190 130 190 150 200" fill="none" stroke="#c084fc" strokeWidth="0.8" opacity="0.3" />
        </g>

        {/* Leaves */}
        {leaves.map((leaf, i) => (
          <g
            key={`leaf-${i}`}
            transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotation}) scale(${leaf.size})`}
            style={{
              animation: `gentleSway 6s ease-in-out ${i * 0.4}s infinite alternate`,
              transformOrigin: "center"
            }}
          >
            <path d="M 0 0 C 18 -10 28 8 12 24 C 0 30 -12 22 -14 10 C -15 2 -8 -3 0 0 Z" fill="url(#leafGrad)" />
            <path d="M -2 2 C 8 8 12 14 12 22" stroke="#d1fae5" strokeWidth="1.1" opacity="0.35" fill="none" />
            <path d="M 0 -2 C 6 -10 10 -8 8 0" stroke="#2f6b2f" strokeWidth="0.8" opacity="0.5" fill="none" />
          </g>
        ))}

        {/* Flowers - each with its own stem connected to the bouquet */}
        {flowers.map((flower) => (
          <Flower
            key={`${flower.x}-${flower.y}`}
            x={flower.x}
            y={flower.y}
            size={flower.size}
            color={flower.color}
            stemLength={flower.stemLength}
            rotation={flower.rotation}
            stemCurve={flower.stemCurve}
            delay={flower.delay}
          />
        ))}
      </svg>

      {/* Text overlay */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-xl font-light tracking-[0.35em] text-purple-200">BU ÇİÇEKLER SANA</p>
        <p className="mt-2 text-5xl font-light tracking-[0.2em] text-pink-300">&lt;3</p>
      </div>
    </div>
  );
}

// Realistic flower component with proper stem connection
function Flower({ x, y, size, color, stemLength, rotation, stemCurve, delay }) {
  const petals = 7; // Number of petals per flower
  const petalSize = size * 15;
  const centerSize = size * 4;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation})`}
      style={{
        animation: `bloomStagger 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards`,
      }}
      className="origin-center scale-0"
    >
      {/* Curved stem connecting to bouquet */}
      <path
        d={`M 0 0 C ${stemCurve} -${stemLength * 0.4} ${-stemCurve * 0.8} -${stemLength * 0.8} 0 -${stemLength}`}
        stroke="#2f6b2f"
        strokeWidth={size * 1.2}
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
        style={{ filter: "drop-shadow(0 2px 4px rgba(47,107,47,0.3))" }}
      />

      {/* Flower head */}
      <g
        transform={`translate(0, -${stemLength})`}
        style={{ filter: "drop-shadow(0 0 15px rgba(147,51,234,0.5))" }}
      >
        {/* Center with depth */}
        <defs>
          <radialGradient id={`center-${x}-${y}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r={centerSize} fill="url(#center)" opacity="0.9" />
        <circle cx="0" cy="0" r={centerSize * 0.7} fill={color} />
        <circle cx="0" cy="0" r={centerSize * 0.4} fill="#7c2d12" opacity="0.3" />

        {/* Realistic petals with highlights and shadows */}
        {Array.from({ length: petals }).map((_, j) => {
          const angle = (j / petals) * Math.PI * 2;
          const petalX = petalSize * Math.cos(angle);
          const petalY = petalSize * Math.sin(angle);
          const petalRotation = angle * (180 / Math.PI) + (j % 2 === 0 ? 3 : -3);

          return (
            <g
              key={j}
              transform={`translate(${petalX}, ${petalY}) rotate(${petalRotation})`}
              style={{
                animation: `petalFloat 5s ease-in-out ${delay + j * 0.15}s infinite`,
                transformOrigin: "center"
              }}
            >
              {/* Main petal shape - organic bezier curves */}
              <path
                d="M 0,-14 C 10,-26 25,-12 30,0 C 25,12 10,26 0,14 C -10,26 -25,12 -30,0 C -25,-12 -10,-26 0,-14 Z"
                fill={color}
                opacity="0.85"
              />
              {/* Petal highlight */}
              <path
                d="M 0,-12 C 8,-22 18,-10 22,0 C 18,10 8,22 0,12 C -8,22 -18,10 -22,0 C -18,-10 -8,-22 0,-12 Z"
                fill="#f5d0fe"
                opacity="0.4"
              />
              {/* Petal shadow */}
              <path
                d="M 0,-14 C 6,-24 16,-16 20,0 C 16,16 6,24 0,14 C -6,24 -16,16 -20,0 C -16,-16 -6,-24 0,-14 Z"
                fill={color}
                opacity="0.6"
                transform="scale(0.9)"
              />
              {/* Petal vein details */}
              <path d="M 0 -2 L 0 2" stroke="#f3e8ff" opacity="0.4" strokeWidth="0.5" />
            </g>
          );
        })}
      </g>
    </g>
  );
}