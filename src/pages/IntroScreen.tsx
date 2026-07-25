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
        @keyframes bloomBud { to { transform: scale(1); } }
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
            <Bouquet />
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

interface Stem {
  id: number;
  angle: number;
  height: number;
  delay: number;
}

function Bouquet() {
  // İstediğiniz gibi 24 adet dolu dolu ve zengin sap/çiçek konfigürasyonu
  const stems: Stem[] = Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    angle: (i - 11.5) * 6.5, // -75 ile +75 derece arasında zarif bir yelpaze dağılımı
    height: 130 + (i % 5) * 15,
    delay: i * 0.05,
  }));

  return (
    <div className="relative flex h-80 w-96 items-end justify-center">
      
      {/* Çiçek Tozları / Işık Parçacıkları */}
      {Array.from({ length: 15 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-purple-300"
          style={{
            left: `${15 + Math.random() * 70}%`,
            bottom: '25%',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animation: `lidFly ${Math.random() * 3 + 2}s infinite ease-out`,
            opacity: 0,
            animationDelay: `${i * 0.2}px`,
            boxShadow: '0 0 10px rgba(216, 180, 254, 0.9)'
          }}
        />
      ))}

      {/* İstediğiniz Kodun Birebir Mantığıyla Oluşturulan Çiçek Demeti */}
      <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-px h-px z-20">
        {stems.map((stem) => (
          <div
            key={stem.id}
            className="absolute bottom-0 left-[-20px] w-10 origin-bottom"
            style={{ 
              transform: `rotate(${stem.angle}deg)`,
              height: `${stem.height}px`
            }}
          >
            <svg width="40" height={stem.height} viewBox={`0 0 40 ${stem.height}`} className="overflow-visible">
              {/* Uzayan Yeşil Sap */}
              <line
                x1="20"
                y1={stem.height}
                x2="20"
                y2="20"
                stroke="#22c55e"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={stem.height}
                strokeDashoffset={stem.height}
                style={{
                  animation: `growStem 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${stem.delay}s forwards`
                }}
              />
              {/* Sonradan Beliren Mor Tomurcuk */}
              <circle
                cx="20"
                cy="15"
                r="11"
                fill="#a855f7"
                className="origin-[20px_15px] scale-0"
                style={{
                  animation: `bloomBud 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${stem.delay + 1.2}s forwards`
                }}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Cam Vazo Tasarımı */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 opacity-95 pointer-events-none">
        {/* Vazo Ağzı */}
        <div className="w-[55px] h-2.5 bg-purple-200/40 border-2 border-purple-300/50 rounded-full backdrop-blur-sm"></div>
        {/* Vazo Boynu */}
        <div className="w-[42px] h-[30px] bg-purple-900/30 border-x-2 border-purple-400/40 -mt-1 backdrop-blur-sm"></div>
        {/* Vazo Gövdesi */}
        <div className="w-28 h-[110px] bg-gradient-to-br from-purple-900/40 to-indigo-950/60 border border-purple-400/30 rounded-t-2xl rounded-b-[50px] shadow-[0_10px_30px_rgba(147,51,234,0.3)] backdrop-blur-md"></div>
      </div>

    </div>
  );
}
