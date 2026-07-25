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

interface FlowerNode {
  id: number;
  baseX: number; // Vazo içindeki çıkış noktası (farklı X koordinatları)
  tipX: number;  // Çiçek başlığının X konumu
  tipY: number;  // Çiçek başlığının Y konumu (vazonun hemen ağız hizasında)
  pathD: string; // Organik kavisli sap yolu
  pathLength: number;
  delay: number;
  type: "rose" | "orchid" | "peony" | "tulip";
  palette: {
    dark: string;
    mid: string;
    light: string;
    accent: string;
  };
}

function TrueRealisticBouquetScene() {
  // Mor, Neon Mor ve Violet (Menekşe/Lila/Derin Mor) tonlarında lüks palet
  const palette = {
    deepViolet: "#4c1d95",
    neonPurple: "#a855f7",
    brightViolet: "#c084fc",
    electricNeon: "#d946ef",
    softLavender: "#e9d5ff",
    darkPlum: "#2e1065"
  };

  const flowers: FlowerNode[] = [
    {
      id: 1,
      baseX: 95,
      tipX: 45,
      tipY: 55,
      pathD: "M 95 145 C 90 110 65 80 45 55",
      pathLength: 120,
      delay: 0.1,
      type: "rose",
      palette: { dark: palette.darkPlum, mid: palette.deepViolet, light: palette.neonPurple, accent: palette.softLavender }
    },
    {
      id: 2,
      baseX: 102,
      tipX: 72,
      tipY: 35,
      pathD: "M 102 145 C 95 105 85 70 72 35",
      pathLength: 130,
      delay: 0.25,
      type: "peony",
      palette: { dark: palette.deepViolet, mid: palette.neonPurple, light: palette.brightViolet, accent: palette.softLavender }
    },
    {
      id: 3,
      baseX: 110,
      tipX: 110,
      tipY: 20,
      pathD: "M 110 145 C 110 100 110 60 110 20",
      pathLength: 125,
      delay: 0.4,
      type: "orchid",
      palette: { dark: palette.darkPlum, mid: palette.electricNeon, light: palette.brightViolet, accent: palette.softLavender }
    },
    {
      id: 4,
      baseX: 118,
      tipX: 148,
      tipY: 42,
      pathD: "M 118 145 C 125 105 138 72 148 42",
      pathLength: 135,
      delay: 0.55,
      type: "tulip",
      palette: { dark: palette.deepViolet, mid: palette.brightViolet, light: palette.electricNeon, accent: palette.softLavender }
    },
    {
      id: 5,
      baseX: 125,
      tipX: 175,
      tipY: 65,
      pathD: "M 125 145 C 135 110 155 82 175 65",
      pathLength: 140,
      delay: 0.7,
      type: "rose",
      palette: { dark: palette.darkPlum, mid: palette.neonPurple, light: palette.softLavender, accent: palette.electricNeon }
    }
  ];

  return (
    <div className="relative flex h-[420px] w-[460px] items-end justify-center">
      
      {/* Atmosferik Sihirli Işık Parçacıkları */}
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            bottom: `${15 + Math.random() * 70}%`,
            width: `${Math.random() * 3.5 + 1}px`,
            height: `${Math.random() * 3.5 + 1}px`,
            backgroundColor: i % 2 === 0 ? '#d946ef' : '#c084fc',
            animation: `floatDust ${Math.random() * 3 + 2.5}s infinite ease-out`,
            animationDelay: `${i * 0.1}s`,
            boxShadow: '0 0 10px rgba(217, 70, 239, 0.9)'
          }}
        />
      ))}

      {/* Çiçekler ve Saplar Katmanı (Vazonun Hemen Üstünde Konumlandırıldı) */}
      <div className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 w-[260px] h-[300px] z-20 overflow-visible pointer-events-none">
        <svg viewBox="0 0 220 280" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>

          {flowers.map((fl) => (
            <g key={fl.id}>
              {/* Gerçekçi, Doğal Kavisli Sap */}
              <path
                d={fl.pathD}
                fill="none"
                stroke="url(#stemGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeDasharray={fl.pathLength}
                style={{
                  ['--dash-len' as any]: fl.pathLength,
                  animation: `stemGrow 1.1s cubic-bezier(0.25, 1, 0.5, 1) ${fl.delay}s forwards`
                }}
              />

              {/* Çiçek Başı - Kademeli Açılma Animasyonu */}
              <g 
                transform={`translate(${fl.tipX}, ${fl.tipY})`}
                className="scale-0 origin-center"
                style={{
                  animation: `bloomStagger 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${fl.delay + 0.85}s forwards`
                }}
              >
                {/* 1. ROSS (Gül / Şakayık Tarzı Katmanlı Yapraklar) */}
                {fl.type === "rose" && (
                  <g>
                    <circle cx="0" cy="0" r="24" fill={fl.palette.dark} opacity="0.85" />
                    <circle cx="0" cy="0" r="19" fill={fl.palette.mid} />
                    <circle cx="-3" cy="-3" r="14" fill={fl.palette.light} />
                    <circle cx="2" cy="2" r="9" fill={fl.palette.accent} />
                    <circle cx="0" cy="0" r="4" fill="#fef08a" filter="drop-shadow(0 0 6px #d946ef)" />
                  </g>
                )}

                {/* 2. PEONY (Çok Katmanlı Volümlü Çiçek) */}
                {fl.type === "peony" && (
                  <g>
                    {Array.from({ length: 6 }).map((_, pIdx) => (
                      <ellipse
                        key={pIdx}
                        cx="0"
                        cy="0"
                        rx="12"
                        ry="20"
                        fill={fl.palette.mid}
                        transform={`rotate(${pIdx * 60})`}
                        opacity="0.9"
                      />
                    ))}
                    <circle cx="0" cy="0" r="15" fill={fl.palette.light} />
                    <circle cx="0" cy="0" r="8" fill={fl.palette.accent} />
                    <circle cx="0" cy="0" r="3.5" fill="#fef08a" />
                  </g>
                )}

                {/* 3. ORCHID (Zarif Neon Menekşe/Orkide) */}
                {fl.type === "orchid" && (
                  <g>
                    <path d="M 0 -22 C -15 -32 -25 -12 0 10 C 25 -12 15 -32 0 -22 Z" fill={fl.palette.light} />
                    <path d="M -16 -6 C -28 4 -18 24 0 14 C -6 6 -12 0 -16 -6 Z" fill={fl.palette.mid} />
                    <path d="M 16 -6 C 28 4 18 24 0 14 C 6 6 12 0 16 -6 Z" fill={fl.palette.mid} />
                    <path d="M 0 -2 C -10 16 0 30 0 30 C 0 30 10 16 0 -2 Z" fill={fl.palette.accent} filter="brightness(1.15)" />
                    <circle cx="0" cy="3" r="4.5" fill="#fef08a" filter="drop-shadow(0 0 6px #d946ef)" />
                  </g>
                )}

                {/* 4. TULIP (Şık Violet Lale) */}
                {fl.type === "tulip" && (
                  <g>
                    <path d="M 0 12 Q -18 -12 -12 -30 Q -2 -18 0 2 Z" fill={fl.palette.dark} />
                    <path d="M 0 12 Q 18 -12 12 -30 Q 2 -18 0 2 Z" fill={fl.palette.light} />
                    <path d="M 0 15 Q -12 -28 0 -40 Q 12 -28 0 15 Z" fill={fl.palette.mid} />
                    <circle cx="0" cy="-10" r="2.5" fill="#fef08a" />
                  </g>
                )}
              </g>
            </g>
          ))}
        </svg>
      </div>

      {/* Lüks Kristal Cam Vazo (Mükemmel Boyut ve Oran) */}
      <div className="absolute bottom-0 z-30 flex flex-col items-center pointer-events-none">
        <svg width="150" height="170" viewBox="0 0 150 170" className="overflow-visible drop-shadow-[0_25px_40px_rgba(88,28,135,0.6)]">
          
          <defs>
            <linearGradient id="vialWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#581c87" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="crystalGlass" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
              <stop offset="40%" stopColor="rgba(216, 180, 254, 0.04)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.22)" />
            </linearGradient>
          </defs>

          {/* Vazo İçi Su Hacmi */}
          <path d="M 48 68 Q 75 60 102 68 L 112 152 Q 75 164 38 152 Z" fill="url(#vialWater)" />

          {/* Kristal Cam Vazo Gövdesi */}
          <path 
            d="M 48 50 L 102 50 Q 112 58 116 75 L 128 152 Q 132 165 108 165 L 42 165 Q 18 165 22 152 L 34 75 Q 38 58 48 50 Z" 
            fill="url(#crystalGlass)" 
            stroke="rgba(233, 213, 255, 0.65)" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
          />

          {/* Vazo Ağzı (Elips Derinlik Efekti) */}
          <ellipse cx="75" cy="50" rx="27" ry="8" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(233, 213, 255, 0.8)" strokeWidth="2" />

          {/* Gerçekçi Cam Işık Kırılma Yansımaları */}
          <path d="M 44 80 Q 40 115 50 145" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="4" strokeLinecap="round" />
          <path d="M 108 80 Q 111 110 102 135" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

    </div>
  );
}
