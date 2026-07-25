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
        @keyframes bloomViolet { 
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          70% { transform: scale(1.08) rotate(3deg); opacity: 1; }
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
          <div className="relative z-10 flex flex-col items-center gap-10 animate-in fade-in duration-1000">
            <WildFlowerScene />
            <p className="text-4xl font-extralight tracking-widest text-purple-100">{recipientName}</p>
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

interface FlowerItem {
  id: number;
  angle: number;
  height: number;
  delay: number;
  hue: string;
  xOffset: number;
}

function WildFlowerScene() {
  // Görseldeki gibi ana odak menekşeleri (farklı yükseklik ve açılarda)
  const mainFlowers: FlowerItem[] = [
    { id: 1, angle: -12, height: 160, delay: 0.1, hue: "#c084fc", xOffset: -30 },
    { id: 2, angle: 4, height: 190, delay: 0.3, hue: "#a855f7", xOffset: 0 },
    { id: 3, angle: 18, height: 150, delay: 0.5, hue: "#d8b4fe", xOffset: 35 },
  ];

  return (
    <div className="relative flex h-80 w-[420px] items-end justify-center">
      
      {/* Etrafta Uçuşan Sihirli Sarı/Mor Işık Parçacıkları (Görseldeki gibi) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${5 + Math.random() * 90}%`,
            bottom: `${10 + Math.random() * 40}%`,
            width: `${Math.random() * 3 + 1.5}px`,
            height: `${Math.random() * 3 + 1.5}px`,
            backgroundColor: i % 2 === 0 ? '#fde047' : '#d8b4fe',
            animation: `floatDust ${Math.random() * 3 + 2}s infinite ease-out`,
            animationDelay: `${i * 0.15}s`,
            boxShadow: i % 2 === 0 ? '0 0 8px #fde047' : '0 0 8px #c084fc'
          }}
        />
      ))}

      {/* Zemin Çalıları ve Yaprak Kümeleri (Sol ve Sağ Yanlar) */}
      <div className="absolute bottom-0 w-full h-32 flex justify-between items-end px-4 pointer-events-none z-10 opacity-90">
        {/* Sol taraftaki mor/yeşil yaprak kümesi */}
        <svg width="140" height="90" viewBox="0 0 140 90" className="overflow-visible">
          <path d="M 10 90 Q 20 40 50 20 Q 20 70 10 90 Z" fill="#7e22ce" opacity="0.8" />
          <path d="M 30 90 Q 50 30 90 10 Q 50 60 30 90 Z" fill="#9333ea" opacity="0.9" />
          <path d="M 50 90 Q 70 50 120 30 Q 80 70 50 90 Z" fill="#a855f7" />
          <path d="M 20 90 Q 10 50 0 30 Q 10 70 20 90 Z" fill="#22c55e" />
          <path d="M 40 90 Q 30 40 15 15 Q 30 65 40 90 Z" fill="#16a34a" />
        </svg>

        {/* Sağ taraftaki uzun otlar ve çalılar */}
        <svg width="150" height="110" viewBox="0 0 150 110" className="overflow-visible">
          <path d="M 130 110 Q 120 40 100 0 Q 130 60 130 110 Z" fill="#22c55e" />
          <path d="M 100 110 Q 90 50 60 10 Q 90 70 100 110 Z" fill="#15803d" />
          <path d="M 115 110 Q 135 60 150 20 Q 125 70 115 110 Z" fill="#4ade80" />
          <path d="M 80 110 Q 60 60 40 20 Q 70 70 80 110 Z" fill="#7e22ce" opacity="0.7" />
        </svg>
      </div>

      {/* Ana Çizgiden / Topraktan Büyüyen Menekşeler */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-px h-px z-20 overflow-visible">
        {mainFlowers.map((flower) => (
          <div
            key={flower.id}
            className="absolute bottom-0 origin-bottom"
            style={{ 
              left: `${flower.xOffset}px`,
              transform: `rotate(${flower.angle}deg)`,
              height: `${flower.height}px`
            }}
          >
            <svg width="40" height={flower.height} viewBox={`0 0 40 ${flower.height}`} className="overflow-visible">
              {/* Uzayan Kavisli Sap */}
              <line
                x1="20"
                y1={flower.height}
                x2="20"
                y2="25"
                stroke="#22c55e"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={flower.height}
                strokeDashoffset={flower.height}
                style={{
                  animation: `growStem 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${flower.delay}s forwards`
                }}
              />
              
              {/* Detaylı Menekşe Çiçek Başlığı */}
              <g 
                transform="translate(20, 25)" 
                className="scale-0 origin-center"
                style={{
                  animation: `bloomViolet 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${flower.delay + 1.2}s forwards`
                }}
              >
                {/* Taç Yapraklar */}
                <path d="M 0 0 C -14 -20, -20 -6, 0 12 C 20 -6, 14 -20, 0 0 Z" fill={flower.hue} opacity="0.95" />
                <path d="M 0 0 C -16 3, -12 20, 0 14 C 12 20, 16 3, 0 0 Z" fill={flower.hue} filter="brightness(1.25)" />
                <path d="M 0 0 C -9 -17, 9 -17, 0 -25 C -9 -17, 9 -17, 0 0 Z" fill={flower.hue} filter="brightness(0.75)" />
                
                {/* Parlayan Merkez Polen */}
                <circle cx="0" cy="0" r="4" fill="#fef08a" filter="drop-shadow(0 0 5px #fde047)" />
                <circle cx="-1.5" cy="-1" r="1" fill="#ca8a04" />
                <circle cx="1.5" cy="-1" r="1" fill="#ca8a04" />
                <circle cx="0" cy="1.5" r="1" fill="#ca8a04" />
              </g>
            </svg>
          </div>
        ))}
      </div>

    </div>
  );
}
