import { useState } from "react";
import { birthdayMessage, recipientName } from "../data/birthdayMessage";
import { Menu } from "lucide-react";

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
      setTimeout(() => setStage("flowers"), 1500);
    }
  }

  return (
    <>
      <style>{`
        @keyframes growStem { to { stroke-dashoffset: 0; } }
        @keyframes bloomFlower { 
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          70% { transform: scale(1.12) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes floatDust {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
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
      `}</style>

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#05030a] px-6 font-sans text-white">
        
        {/* Arka Plan Atmosferik Işıklar */}
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
              onClick={() => setStage("gift")}
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
              sana ufak bir hediyem var
            </p>
            <p className="text-4xl font-extralight tracking-widest text-purple-100">{recipientName}</p>
            <GiftBox clicks={clicks} total={totalClicks} opening={false} onClick={handleGiftClick} />
            <p className="text-purple-300 text-xs tracking-widest opacity-70">Sihri uyandırmak için dokun</p>
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
            <GlassVaseBouquetScene />
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

interface RichFlowerConfig {
  id: number;
  startX: number;
  endX: number;
  height: number;
  delay: number;
  colorMain: string;
  colorSecondary: string;
  type: "peony" | "daisy" | "orchid";
}

function GlassVaseBouquetScene() {
  // Çok katmanlı, zengin ve estetik duran lüks çiçek demeti konfigürasyonu
  const flowers: RichFlowerConfig[] = [
    { id: 1, startX: 95, endX: 40, height: 190, delay: 0.1, colorMain: "#f472b6", colorSecondary: "#db2777", type: "peony" },
    { id: 2, startX: 97, endX: 68, height: 220, delay: 0.2, colorMain: "#c084fc", colorSecondary: "#9333ea", type: "orchid" },
    { id: 3, startX: 100, endX: 100, height: 245, delay: 0.3, colorMain: "#fb7185", colorSecondary: "#e11d48", type: "peony" },
    { id: 4, startX: 103, endX: 132, height: 215, delay: 0.4, colorMain: "#e879f9", colorSecondary: "#c084fc", type: "daisy" },
    { id: 5, startX: 105, endX: 160, height: 185, delay: 0.5, colorMain: "#fbcfe8", colorSecondary: "#f472b6", type: "orchid" },
  ];

  return (
    <div className="relative flex h-96 w-[420px] items-end justify-center">
      
      {/* Parıltılı Toz Efekti */}
      {Array.from({ length: 25 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            bottom: `${10 + Math.random() * 65}%`,
            width: `${Math.random() * 3.5 + 1}px`,
            height: `${Math.random() * 3.5 + 1}px`,
            backgroundColor: i % 3 === 0 ? '#fde047' : '#f3e8ff',
            animation: `floatDust ${Math.random() * 3 + 2.5}s infinite ease-out`,
            animationDelay: `${i * 0.1}s`,
            boxShadow: '0 0 10px rgba(243, 232, 255, 0.9)'
          }}
        />
      ))}

      {/* Detaylı Çiçekler ve Zarif Saplar */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[220px] h-[260px] z-20 overflow-visible pointer-events-none">
        <svg viewBox="0 0 220 260" className="w-full h-full overflow-visible">
          {flowers.map((flower) => {
            const rootY = 150; // Vazo boğaz hizası
            const topY = rootY - flower.height + 65;

            return (
              <g key={flower.id}>
                {/* Kavisli Yeşil Sap */}
                <path
                  d={`M 110 ${rootY} Q ${(110 + flower.endX)/2} ${rootY - 45} ${flower.endX} ${topY}`}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={flower.height}
                  strokeDashoffset={flower.height}
                  style={{
                    animation: `growStem 1.3s cubic-bezier(0.4, 0, 0.2, 1) ${flower.delay}s forwards`
                  }}
                />

                {/* Zengin ve Çok Katmanlı Çiçek Başlığı */}
                <g 
                  transform={`translate(${flower.endX}, ${topY})`}
                  className="scale-0 origin-center"
                  style={{
                    animation: `bloomFlower 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${flower.delay + 0.95}s forwards`
                  }}
                >
                  {/* Papatya / Yıldız Çiçek Modeli */}
                  {flower.type === "daisy" && (
                    <g>
                      {Array.from({ length: 8 }).map((_, pIdx) => (
                        <ellipse
                          key={pIdx}
                          cx="0"
                          cy="0"
                          rx="6"
                          ry="18"
                          fill={flower.colorMain}
                          transform={`rotate(${pIdx * 45})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="7" fill="#fef08a" filter="drop-shadow(0 0 6px #fde047)" />
                      <circle cx="0" cy="0" r="3" fill="#ca8a04" />
                    </g>
                  )}

                  {/* Şakayık / Katmerli Gül Modeli */}
                  {flower.type === "peony" && (
                    <g>
                      <circle cx="0" cy="0" r="22" fill={flower.colorSecondary} opacity="0.7" />
                      <circle cx="0" cy="0" r="17" fill={flower.colorMain} />
                      <circle cx="-3" cy="-3" r="12" fill={flower.colorSecondary} filter="brightness(1.15)" />
                      <circle cx="3" cy="2" r="8" fill={flower.colorMain} filter="brightness(1.25)" />
                      <circle cx="0" cy="0" r="4" fill="#fef08a" />
                    </g>
                  )}

                  {/* Zarif Orkide Modeli */}
                  {flower.type === "orchid" && (
                    <g>
                      <path d="M 0 -18 C -12 -28 -22 -10 0 10 C 22 -10 12 -28 0 -18 Z" fill={flower.colorMain} />
                      <path d="M -14 -5 C -25 5 -15 22 0 12 C -5 5 -10 0 -14 -5 Z" fill={flower.colorSecondary} />
                      <path d="M 14 -5 C 25 5 15 22 0 12 C 5 5 10 0 14 -5 Z" fill={flower.colorSecondary} />
                      <path d="M 0 0 C -8 15 0 28 0 28 C 0 28 8 15 0 0 Z" fill={flower.colorMain} filter="brightness(1.1)" />
                      <circle cx="0" cy="2" r="4.5" fill="#fef08a" filter="drop-shadow(0 0 5px #fde047)" />
                    </g>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Şık ve Lüks Kristal Cam Vazo */}
      <div className="absolute bottom-0 z-30 flex flex-col items-center pointer-events-none">
        <svg width="140" height="160" viewBox="0 0 140 160" className="overflow-visible drop-shadow-[0_25px_35px_rgba(107,33,168,0.5)]">
          {/* Vazo İçi Su Efekti */}
          <path d="M 45 65 Q 70 58 95 65 L 105 145 Q 70 155 35 145 Z" fill="url(#waterGradient)" opacity="0.35" />
          
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
              <stop offset="50%" stopColor="rgba(216, 180, 254, 0.03)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
            </linearGradient>
          </defs>

          {/* Vazo Gövdesi */}
          <path 
            d="M 45 48 L 95 48 Q 105 55 108 72 L 120 142 Q 124 155 102 155 L 38 155 Q 16 155 20 142 L 32 72 Q 35 55 45 48 Z" 
            fill="url(#glassGradient)" 
            stroke="rgba(233, 213, 255, 0.5)" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
          />

          {/* Vazo Ağzı (Elips) */}
          <ellipse cx="70" cy="48" rx="25" ry="7" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(233, 213, 255, 0.6)" strokeWidth="2" />

          {/* Gerçekçi Cam Işık Yansımaları */}
          <path d="M 42 75 Q 38 105 46 135" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 100 75 Q 103 100 96 125" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

    </div>
  );
}
