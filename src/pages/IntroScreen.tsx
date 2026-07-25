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
      // Yeni kutu patlama animasyonu için süreyi biraz uzattık
      setTimeout(() => setStage("flowers"), 1500); 
    }
  }

  return (
    <>
      {/* BAŞTAN YAZILAN ÖZEL ANİMASYONLAR (Projeyi bozmamak için buraya eklendi) */}
      <style>{`
        @keyframes drawStem {
          to { stroke-dashoffset: 0; }
        }
        @keyframes bloomFlower {
          0% { transform: scale(0) rotate(-5deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes boxShake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-3deg) scale(1.05); }
          75% { transform: rotate(3deg) scale(1.05); }
        }
        @keyframes lidFly {
          0% { transform: translateY(0) rotate(0) scale(1); opacity: 1; }
          100% { transform: translateY(-120px) rotate(20deg) scale(1.2); opacity: 0; }
        }
        @keyframes boxFade {
          0% { opacity: 1; transform: scale(1); filter: brightness(1); }
          100% { opacity: 0; transform: scale(0.5); filter: brightness(2); }
        }
        @keyframes blobFloat {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020617] px-6 font-sans text-white">
        
        {/* BAMBAŞKA ARKA PLAN: Süzülen Ambient Işıklar (Gradient Mesh) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-purple-900/30 blur-[120px]"
            style={{ animation: 'blobFloat 12s infinite alternate ease-in-out' }}
          />
          <div 
            className="absolute -bottom-32 -right-32 h-[40rem] w-[40rem] rounded-full bg-indigo-900/20 blur-[120px]"
            style={{ animation: 'blobFloat 15s infinite alternate-reverse ease-in-out' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-900/10 blur-[100px]"
            style={{ animation: 'blobFloat 10s infinite alternate ease-in-out' }}
          />
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
                background: "linear-gradient(to right, #d8b4fe, #e9d5ff, #c084fc)", 
                WebkitBackgroundClip: "text",
                textShadow: "0 0 40px rgba(216, 180, 254, 0.4)"
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
              className="group relative overflow-hidden rounded-full border border-purple-400/30 bg-purple-900/20 px-12 py-4 text-sm font-bold tracking-[0.3em] text-purple-100 backdrop-blur-md transition-all hover:bg-purple-800/40 hover:border-purple-400/60"
            >
              <span className="relative z-10">DEVAM ET</span>
              {/* Buton içi parlama efekti */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>
          </div>
        )}

        {stage === "message" && (
          <div className="relative z-10 max-w-xl rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 text-center shadow-[0_0_50px_rgba(88,28,135,0.3)] backdrop-blur-xl sm:p-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
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
        style={{ animation: opening ? 'boxFade 0.8s forwards 0.4s' : 'none' }}
      >
        {/* BAMBAŞKA KUTU: SVG Tabanlı Altıgen Mistik Kutu */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_30px_rgba(147,51,234,0.5)]">
           
           {/* Arka plan parlaklığı (Tıkladıkça güçlenir) */}
           <circle cx="100" cy="110" r="70" fill="#a855f7" opacity={0.05 + (clicks * 0.1)} className="transition-opacity duration-300" />
           
           {/* Kutunun Alt Gövdesi (Geometrik Yapı) */}
           <path d="M 40 85 L 160 85 L 145 160 L 55 160 Z" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
           {/* Gövde Detay Çizgileri */}
           <path d="M 40 85 L 100 120 L 160 85" fill="none" stroke="#c084fc" strokeWidth="1.5" opacity="0.6" />
           <path d="M 100 120 L 100 160" fill="none" stroke="#c084fc" strokeWidth="1.5" opacity="0.6" />
           
           {/* Kutu Kapağı (Açılırken yukarı fırlar) */}
           <g style={{ animation: opening ? 'lidFly 1s forwards cubic-bezier(0.16, 1, 0.3, 1)' : 'none', transformOrigin: 'center' }}>
             <path d="M 25 65 Q 100 30 175 65 L 160 85 L 40 85 Z" fill="#3b0764" stroke="#d8b4fe" strokeWidth="2" />
             {/* Kilit Taşı / Kristal */}
             <polygon points="100,65 115,80 100,95 85,80" fill="#f3e8ff" />
             <polygon points="100,70 110,80 100,90 90,80" fill="#a855f7" className="animate-pulse" />
           </g>

           {/* Enerji Dalgaları (Her tıklamada büyüyen çember) */}
           {clicks > 0 && !opening && (
             <circle cx="100" cy="80" r={20 + (clicks * 6)} fill="none" stroke="#e9d5ff" strokeWidth="1" opacity="0.5" className="animate-ping" />
           )}
        </svg>
      </div>
      
      {/* Tıklama İlerlemesi (Basit Noktalar Yerine Kristal Prizmalar) */}
      {!opening && clicks > 0 && clicks < total && (
        <div className="absolute -bottom-8 flex gap-3">
           {Array.from({ length: total }).map((_, i) => (
             <div 
               key={i} 
               className={`h-2.5 w-2.5 rotate-45 transition-all duration-500 ${i < clicks ? 'bg-purple-300 shadow-[0_0_10px_#d8b4fe] scale-125' : 'bg-white/10 scale-100 border border-white/20'}`} 
             />
           ))}
        </div>
      )}
    </button>
  );
}

function Bouquet() {
  return (
    <div className="relative flex h-72 w-80 items-end justify-center">
      
      {/* Arka Planda Uçuşan Vektörel Işık Tozları */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-purple-300"
          style={{
            left: `${15 + Math.random() * 70}%`,
            bottom: '20%',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animation: `lidFly ${Math.random() * 3 + 2}s forwards ease-out`,
            opacity: 0,
            animationDelay: `${i * 0.15 + 0.5}s`,
            boxShadow: '0 0 8px rgba(216, 180, 254, 0.8)'
          }}
        />
      ))}
      
      {/* Kristal Vazo/Kaide */}
      <div className="absolute bottom-0 z-20 h-16 w-32 drop-shadow-2xl">
        <svg viewBox="0 0 100 50" className="w-full h-full">
           <polygon points="20,0 80,0 65,50 35,50" fill="rgba(30, 27, 75, 0.6)" stroke="#a855f7" strokeWidth="1.5" />
           <polygon points="25,5 75,5 62,45 38,45" fill="rgba(255, 255, 255, 0.05)" />
        </svg>
      </div>

      {/* BAMBAŞKA ÇİÇEKLER: SVG Lotus/Lale Formları */}
      {flowerPositions.map((f, i) => (
        <div key={i} className="absolute bottom-12 z-10" style={{ left: `${f.x}%` }}>
           <Flower size={f.size} delay={i * 0.2} height={f.height} color={f.color} />
        </div>
      ))}
    </div>
  );
}

// Çiçeklerin yerleşim ve renk ayarları
const flowerPositions = [
  { x: 15, size: 50, height: 120, color: '#9333ea' },
  { x: 45, size: 70, height: 170, color: '#a855f7' },
  { x: 75, size: 50, height: 130, color: '#c084fc' },
  { x: 30, size: 60, height: 150, color: '#d8b4fe' },
  { x: 60, size: 60, height: 155, color: '#7e22ce' },
];

function Flower({ size, delay, height, color }: { size: number; delay: number; height: number; color: string }) {
  return (
    <div className="relative flex flex-col items-center justify-end" style={{ height: `${height}px`, width: `${size}px` }}>
       
       {/* Aşağıdan Yukarıya Çizilen Sap Animasyonu */}
       <svg className="absolute bottom-0 z-0" width="6" height={height}>
         <path 
           d={`M 3 ${height} Q 6 ${height/2} 3 0`}
           stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round"
           style={{
             strokeDasharray: height + 20,
             strokeDashoffset: height + 20,
             animation: `drawStem 1s ease-out forwards ${delay}s`
           }}
         />
       </svg>
       
       {/* Gerçekçi Taç Yapraklarla Açan Çiçek Başı */}
       <div 
         className="absolute top-0 z-10" 
         style={{
           width: `${size}px`, height: `${size}px`,
           transformOrigin: 'bottom center',
           animation: `bloomFlower 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${delay + 0.6}s`,
           opacity: 0,
           transform: 'scale(0)'
         }}
       >
         <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
           {/* Arka Taç Yaprak */}
           <path d="M 50 20 C 15 15, 20 95, 50 100 C 80 95, 85 15, 50 20 Z" fill={color} filter="brightness(0.6)" />
           {/* Sol Taç Yaprak */}
           <path d="M 50 100 C 0 95, -10 30, 35 25 C 45 50, 40 85, 50 100 Z" fill={color} filter="brightness(0.85)" />
           {/* Sağ Taç Yaprak */}
           <path d="M 50 100 C 100 95, 110 30, 65 25 C 55 50, 60 85, 50 100 Z" fill={color} filter="brightness(0.85)" />
           {/* Ön/Merkez Taç Yaprak */}
           <path d="M 50 100 C 30 75, 25 35, 50 30 C 75 35, 70 75, 50 100 Z" fill={color} filter="brightness(1.2)" />
           {/* Çiçek Özü (Sarı polen) */}
           <circle cx="50" cy="55" r="6" fill="#fef08a" />
         </svg>
       </div>
    </div>
  );
}
