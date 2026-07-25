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
        @keyframes drawStem {
          to { stroke-dashoffset: 0; }
        }
        @keyframes bloomFlower {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; filter: blur(4px); }
          70% { transform: scale(1.05) rotate(2deg); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px); }
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

function Bouquet() {
  return (
    <div className="relative flex h-80 w-96 items-end justify-center">
      
      {/* Çiçek Tozları / Işık Parçacıkları */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-purple-300"
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: '25%',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animation: `lidFly ${Math.random() * 3 + 2}s infinite ease-out`,
            opacity: 0,
            animationDelay: `${i * 0.2}s`,
            boxShadow: '0 0 10px rgba(216, 180, 254, 0.9)'
          }}
        />
      ))}

      {/* 28 Adet Dolu Dolu ve Katmanlı Çiçek (Arka ve Ön Katmanlar Olarak Dağıtılmıştır) */}
      <div className="absolute bottom-12 z-10 w-full h-full flex justify-center items-end pointer-events-none">
        {flowerData.map((f, i) => (
          <div key={i} className="absolute bottom-0" style={{ left: `calc(50% + ${f.offsetX}px)` }}>
             <Flower 
               size={f.size} 
               delay={f.delay} 
               height={f.height} 
               curvature={f.curvature}
               baseHue={f.hue}
             />
          </div>
        ))}
      </div>

      {/* Şeffaf Kristal Vazo */}
      <div className="absolute bottom-0 z-30 h-24 w-40 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] pointer-events-none">
        <svg viewBox="0 0 120 70" className="w-full h-full">
           {/* Vazo arkası yansıma */}
           <path d="M 25,2 L 95,2 L 105,65 L 15,65 Z" fill="rgba(168, 85, 247, 0.05)" />
           {/* Su seviyesi */}
           <ellipse cx="60" cy="22" rx="38" ry="6" fill="rgba(192, 132, 252, 0.2)" />
           {/* Vazo Gövde Cam Dokusu */}
           <path d="M 25,2 Q 60,8 95,2 L 108,62 Q 110,68 102,68 L 18,68 Q 10,68 12,62 Z" fill="rgba(30, 27, 75, 0.4)" stroke="rgba(216, 180, 254, 0.4)" strokeWidth="1.5" />
           {/* Cam Parlaması */}
           <path d="M 22,15 L 30,55" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" strokeLinecap="round" />
           <path d="M 32,8 L 36,45" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// 28 adet çiçeğin vazo içinden dışarıya doğru muazzam yayılım ve açı konfigürasyonu
const flowerData = Array.from({ length: 28 }).map((_, i) => {
  // Soldan sağa geniş bir yayılım (-130px ile +130px arası)
  const offsetX = (i - 14) * 9 + (Math.sin(i) * 12);
  // Merkezdekiler uzun, kenardakiler kısa ve yanlara doğru eğimli
  const height = 150 + Math.sin(i * 0.5) * 45 + (Math.abs(offsetX) * 0.3);
  const size = 35 + (i % 4) * 9;
  const delay = i * 0.04; // Kademeli akış
  const curvature = offsetX * 0.6; // Vazodan çıkarken dışa doğru bükülme
  const hues = ['#9333ea', '#a855f7', '#c084fc', '#d8b4fe', '#7e22ce', '#e9d5ff'];
  const hue = hues[i % hues.length];
  return { offsetX, height, size, delay, curvature, hue };
});

function Flower({ size, delay, height, curvature, baseHue }: { size: number; delay: number; height: number; curvature: number; baseHue: string }) {
  return (
    <div className="relative flex flex-col items-center justify-end" style={{ height: `${height}px`, width: `${size}px` }}>
       
       {/* Vazodan Dışarı Doğru Büyüyen Organik Sap */}
       <svg className="absolute bottom-0 z-0 overflow-visible" width="100" height={height}>
         <path 
           d={`M 50 ${height} Q ${50 + curvature * 0.5} ${height * 0.5} ${50 + curvature} 0`}
           stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round"
           style={{
             strokeDasharray: height + 50,
             strokeDashoffset: height + 50,
             animation: `drawStem 1.2s ease-out forwards ${delay}s`
           }}
         />
       </svg>
       
       {/* Ultra Gerçekçi, Çok Katmanlı Açan Çiçek Başlığı */}
       <div 
         className="absolute top-0 z-20" 
         style={{
           width: `${size}px`, height: `${size}px`,
           transformOrigin: 'bottom center',
           animation: `bloomFlower 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${delay + 0.5}s`,
           opacity: 0,
           transform: 'scale(0)'
         }}
       >
         <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]">
           {/* Arka Taç Yapraklar (Derinlik Gölgesi) */}
           <path d="M 50 15 C 10 10, 15 90, 50 95 C 85 90, 90 10, 50 15 Z" fill={baseHue} filter="brightness(0.5)" />
           
           {/* Çevresel Taç Yaprak Katmanı (Döndürülmüş detaylar) */}
           <g transform="rotate(45 50 55)">
             <path d="M 50 90 C 20 80, 10 30, 45 25 C 55 45, 50 75, 50 90 Z" fill={baseHue} filter="brightness(0.8)" />
           </g>
           <g transform="rotate(-45 50 55)">
             <path d="M 50 90 C 80 80, 90 30, 55 25 C 45 45, 50 75, 50 90 Z" fill={baseHue} filter="brightness(0.8)" />
           </g>
           
           {/* Ön Canlı Taç Yapraklar */}
           <path d="M 50 95 C 20 70, 15 35, 50 25 C 85 35, 80 70, 50 95 Z" fill={baseHue} filter="brightness(1.15)" />
           <path d="M 50 95 C 35 65, 30 40, 50 35 C 70 40, 65 65, 50 95 Z" fill={baseHue} filter="brightness(1.35)" />
           
           {/* Detaylı Merkez Polen Dokusu */}
           <circle cx="50" cy="55" r="8" fill="#fef08a" filter="drop-shadow(0 0 4px #fde047)" />
           <circle cx="48" cy="53" r="1.5" fill="#ca8a04" />
           <circle cx="53" cy="56" r="1.5" fill="#ca8a04" />
           <circle cx="50" cy="58" r="1.5" fill="#ca8a04" />
         </svg>
       </div>
    </div>
  );
}
