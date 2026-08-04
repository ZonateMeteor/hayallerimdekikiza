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
          0% { transform: scale(0) rotate(-20deg); opacity: 0; filter: drop-shadow(0 0 0px rgba(168,85,247,0)); }
          70% { transform: scale(1.12) rotate(4deg); opacity: 1; filter: drop-shadow(0 0 15px rgba(192,132,252,0.8)); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; filter: drop-shadow(0 0 10px rgba(147,51,234,0.4)); }
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
             transform: scale(0.3) rotateY(-90deg) rotateZ(-45deg) translateY(80px);
             filter: blur(10px) brightness(0.5);
           }
           40% {
             opacity: 0.9;
             transform: scale(1.05) rotateY(15deg) rotateZ(-10deg) translateY(-10px);
             filter: blur(2px);
           }
           100% { 
             opacity: 1; 
             transform: scale(1) rotateY(0deg) rotateZ(0deg) translateY(0);
             filter: blur(0) brightness(1);
           }
         }
      `}</style>

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#05030a] px-6 font-sans text-white">
        
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] rounded-full bg-purple-900/20 blur-[140px]"
            style={{ animation: 'ambientGlow 8s infinite ease-in-out' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#05030a]/80 to-[#05030a]" />
        </div>

        <button
          onClick={onOpenMenu}
          className="fixed left-4 top-4 z-30 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105"
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
              className="text-5xl font-light tracking-[0.2em] text-transparent sm:text-7xl transition-all duration-700 hover:tracking-[0.3em] hover:scale-105"
              style={{ 
                background: "linear-gradient(to right, #e9d5ff, #f3e8ff, #c084fc)", 
                WebkitBackgroundClip: "text",
                textShadow: "0 0 50px rgba(216, 180, 254, 0.5)"
              }}
            >
              merhaba...
            </button>
          </div>
        )}

        {stage === "gift" && (
          <div className="relative z-10 flex flex-col items-center gap-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <p className="text-purple-300 text-sm font-semibold uppercase tracking-[0.4em]">
              sana ufak bir hediyem varrrr
            </p>
            <p className="text-4xl font-extralight tracking-widest text-purple-100">{recipientName}</p>
            <GiftBox clicks={clicks} total={totalClicks} opening={false} onClick={handleGiftClick} />
            <p className="text-purple-300 text-xs tracking-widest opacity-70">Kutuyu açmak için dokun</p>
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
            <TrueRealisticBouquetScene />
            <p className="text-4xl font-extralight tracking-widest text-purple-100 mt-2">{recipientName}</p>
            <button
              onClick={() => setStage("message")}
              className="group relative overflow-hidden rounded-full border border-purple-400/30 bg-purple-900/20 px-12 py-4 text-sm font-bold tracking-[0.3em] text-purple-100 backdrop-blur-md transition-all hover:bg-purple-800/40 hover:border-purple-400/60 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
            >
              <span className="relative z-10">DEVAM ET</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>
          </div>
        )}

        {stage === "message" && (
          <div className="relative z-10 max-w-xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_0_60px_rgba(88,28,135,0.4)] backdrop-blur-2xl sm:p-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
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
      style={{
        animation: isShaking ? 'boxShake 0.4s ease-in-out' : 'none',
      }}
      aria-label="Hediye kutusu"
    >
      <div 
        className={`w-full h-full ${opening ? 'pointer-events-none' : ''}`} 
        style={{ animation: opening ? 'boxFade 0.8s forwards 0.3s' : 'none' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_15px_35px_rgba(147,51,234,0.6)]">
           <circle cx="100" cy="110" r="75" fill="#a855f7" opacity={0.05 + (clicks * 0.12)} className="transition-opacity duration-300" />
           <path d="M 40 85 L 160 85 L 145 160 L 55 160 Z" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
           <path d="M 40 85 L 100 120 L 160 85" fill="none" stroke="#c084fc" strokeWidth="1.5" opacity="0.6" />
           <path d="M 100 120 L 100 160" fill="none" stroke="#c084fc" strokeWidth="1.5" opacity="0.6" />
           
           <g style={{ animation: opening ? 'lidFly 1s forwards cubic-bezier(0.16, 1, 0.3, 1)' : 'none', transformOrigin: 'center' }}>
             <path d="M 25 65 Q 100 30 175 65 L 160 85 L 40 85 Z" fill="#3b0764" stroke="#d8b4fe" strokeWidth="2" />
             <polygon points="100,65 115,80 100,95 85,80" fill="#f3e8ff" />
             <polygon points="100,70 110,80 100,90 90,80" fill="#a855f7" className="animate-pulse" />
           </g>

           {clicks > 0 && !opening && (
             <circle cx="100" cy="80" r={20 + (clicks * 7)} fill="none" stroke="#e9d5ff" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
           )}
        </svg>
      </div>
      
      {!opening && clicks > 0 && clicks < total && (
        <div className="absolute -bottom-8 flex gap-3">
           {Array.from({ length: total }).map((_, i) => (
             <div 
               key={i} 
               className={`h-2.5 w-2.5 rotate-45 transition-all duration-500 ${i < clicks ? 'bg-purple-300 shadow-[0_0_12px_#d8b4fe] scale-125' : 'bg-white/10 scale-100 border border-white/20'}`} 
             />
           ))}
        </div>
      )}
    </button>
  );
}

interface FlowerBud {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  hue: number;
}

function SimplePurpleFlower({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={`outer-${i}`}
          cx={0}
          cy={-size * 0.6}
          rx={size * 0.35}
          ry={size * 0.55}
          fill="#c084fc"
          opacity="0.9"
          transform={`rotate(${angle})`}
        />
      ))}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => (
        <ellipse
          key={`inner-${i}`}
          cx={0}
          cy={-size * 0.5}
          rx={size * 0.28}
          ry={size * 0.45}
          fill="#d946ef"
          opacity="0.85"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r={size * 0.25} fill="#a855f7" />
      <circle cx="0" cy="0" r={size * 0.15} fill="#fef08a" filter="drop-shadow(0 0 3px #d946ef)" />
    </g>
  );
}

function TrueRealisticBouquetScene() {
  const flowers: FlowerBud[] = [
    { id: 1, x: 50, y: 30, size: 16, delay: 0.2, hue: 270 },
    { id: 2, x: 100, y: 10, size: 18, delay: 0.4, hue: 280 },
    { id: 3, x: 150, y: 40, size: 16, delay: 0.6, hue: 275 },
    { id: 4, x: 75, y: 60, size: 14, delay: 0.3, hue: 285 },
    { id: 5, x: 125, y: 75, size: 15, delay: 0.5, hue: 270 },
    { id: 6, x: 100, y: 85, size: 17, delay: 0.7, hue: 280 },
    { id: 7, x: 50, y: 110, size: 14, delay: 0.35, hue: 275 },
    { id: 8, x: 150, y: 100, size: 15, delay: 0.55, hue: 285 },
    { id: 9, x: 100, y: 130, size: 16, delay: 0.75, hue: 270 },
  ];

  return (
    <div 
      className="relative flex flex-col items-center justify-end h-[520px] w-full"
      style={{
        animation: 'bouquetSpinEntry 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
      }}
    >
      <div className="relative w-80 h-64 mb-8">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + Math.cos(rad) * 30;
            const y1 = 100 + Math.sin(rad) * 30;
            return (
              <path
                key={`stem-${i}`}
                d={`M ${x1} ${y1} Q ${100 + Math.cos(rad) * 15} ${50 + Math.sin(rad) * 20} ${100 + Math.cos(rad) * 35} ${20}`}
                stroke="#2d5016"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
          
          {flowers.map((flower) => (
            <g
              key={flower.id}
              style={{
                animation: `bloomStagger 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${flower.delay}s forwards`,
                transformOrigin: `${flower.x}px ${flower.y}px`
              }}
              className="scale-0 origin-center"
            >
              <SimplePurpleFlower x={flower.x} y={flower.y} size={flower.size} />
            </g>
          ))}
        </svg>
      </div>

      <div className="text-center mt-6">
        <p className="text-xl font-light tracking-widest text-purple-200">
          bu çiçekler sana
        </p>
        <p className="text-5xl font-light text-pink-300 mt-2" style={{ letterSpacing: '0.1em' }}>
          &lt;3
        </p>
      </div>

      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: i % 2 === 0 ? '#d946ef' : '#c084fc',
            animation: `floatDust ${Math.random() * 3 + 2}s infinite ease-out`,
            animationDelay: `${i * 0.1}s`,
            boxShadow: '0 0 8px rgba(217, 70, 239, 0.8)'
          }}
        />
      ))}
    </div>
  );
}
