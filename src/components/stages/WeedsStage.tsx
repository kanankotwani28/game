import React, { useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

interface WeedData {
  id: number;
  message: string;
  isRemoved: boolean;
  x: number;
  y: number;
}

export const WeedsStage: React.FC<Props> = ({ onNext }) => {
  const [weeds, setWeeds] = useState<WeedData[]>([
    { id: 1, message: 'I overreacted.', isRemoved: false, x: 15, y: 20 },
    { id: 2, message: "I didn't listen enough.", isRemoved: false, x: 45, y: 15 },
    { id: 3, message: 'I hurt your feelings.', isRemoved: false, x: 75, y: 25 },
    { id: 4, message: 'I forgot your perspective.', isRemoved: false, x: 25, y: 50 },
    { id: 5, message: "I wasn't patient.", isRemoved: false, x: 60, y: 45 },
    { id: 6, message: 'I let my emotions win.', isRemoved: false, x: 85, y: 60 },
    { id: 7, message: "I could've communicated better.", isRemoved: false, x: 10, y: 80 },
    { id: 8, message: "I'm learning.", isRemoved: false, x: 40, y: 75 },
    { id: 9, message: "I'm growing.", isRemoved: false, x: 70, y: 85 },
    { id: 10, message: "I'm truly sorry.", isRemoved: false, x: 90, y: 20 }
  ]);

  const [activeRealization, setActiveRealization] = useState<string | null>(null);
  const [isBasketEquipped, setIsBasketEquipped] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const removedCount = weeds.filter(w => w.isRemoved).length;
  const isComplete = removedCount === 10;

  const equipBasket = () => {
    soundFx.playClick();
    setIsBasketEquipped(true);
    setErrorMessage(null);
  };

  const pullWeed = (id: number) => {
    if (!isBasketEquipped) {
      setErrorMessage("⚠️ Please equip the Weed Basket first to store the weeds! 🧺");
      soundFx.playClick();
      return;
    }

    soundFx.playWeedPull();
    setWeeds(prev =>
      prev.map(w => (w.id === id ? { ...w, isRemoved: true } : w))
    );

    const target = weeds.find(w => w.id === id);
    if (target) {
      setActiveRealization(target.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-4 animate-page-turn justify-between overflow-y-auto lg:overflow-hidden">
      
      {/* Title Header */}
      <div className="text-center shrink-0">
        <div className="inline-block bg-[#FFE28A] border-3 border-[#2F2A2A] px-6 py-1.5 rounded-full shadow-[4px_4px_0px_#2F2A2A]">
          <h2 className="font-pixel-title text-xs md:text-sm text-[#2F2A2A] flex items-center gap-2">
            <span>🌿</span> REMOVE THE WEEDS <span>🌿</span>
          </h2>
        </div>
      </div>

      {/* Main Container */}
      <div
        className="pixel-box border-4 border-[#2F2A2A] shadow-[6px_6px_0px_#2F2A2A] p-3 sm:p-4 md:p-5 flex-grow flex flex-col justify-between transition-all duration-700 relative overflow-hidden"
        style={{
          backgroundColor: `hsl(40, ${30 + (removedCount / 10) * 40}%, ${60 + (removedCount / 10) * 35}%)`
        }}
      >
        <div className="tape-accent tape-top-left"></div>
        <div className="tape-accent tape-top-right"></div>

        {/* Equip weed basket */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 bg-white/80 backdrop-blur border-2 border-[#2F2A2A] p-2 sm:p-3 rounded-xl shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={equipBasket}
              className={`p-3 rounded-xl border-3 border-[#2F2A2A] shadow-[2px_2px_0px_#2F2A2A] transition-all cursor-pointer ${
                isBasketEquipped ? 'bg-[#FFE28A] scale-105 ring-4 ring-[#A8D8A0]' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl sm:text-3xl animate-bounce-slow">🧺</span>
            </button>
            <div>
              <div className="font-pixel text-xs font-bold text-[#2F2A2A]">
                {isBasketEquipped ? '✅ Weed Basket Equipped!' : '👉 Click to pick up the Weed Basket!'}
              </div>
              <div className="font-pixel text-[10px] text-[#2F2A2A]/70">
                You need the basket to keep the weeds you pull.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-pixel text-xs font-bold text-[#2F2A2A]">
              Cleared: {removedCount}/10
            </span>
            <div className="w-24 sm:w-32 h-4 sm:h-4.5 bg-white border-2 border-[#2F2A2A] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-[#A8D8A0] rounded-full transition-all duration-500"
                style={{ width: `${(removedCount / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Warning / Error Message */}
        {errorMessage && (
          <div className="bg-[#FFE28A] border-2 border-red-500 text-red-700 text-xs font-bold px-4 py-2 rounded-xl text-center shrink-0 animate-pulse">
            {errorMessage}
          </div>
        )}

        {/* Realization Banner */}
        <div className="my-1 sm:my-2 h-10 sm:h-14 flex items-center justify-center shrink-0">
          {activeRealization ? (
            <div className="w-full bg-[#FFF7E9] border-2 border-[#2F2A2A] p-2 sm:p-2.5 rounded-xl text-center shadow-[3px_3px_0px_#2F2A2A] font-handwriting text-lg sm:text-xl md:text-2xl text-[#2F2A2A] animate-bounce-slow">
              💭 "{activeRealization}"
            </div>
          ) : (
            <div className="text-xs font-pixel text-[#2F2A2A]/70 italic">
              {isBasketEquipped ? 'Click a weed in the soil to pull it!' : 'Pick up the tool above to start.'}
            </div>
          )}
        </div>

        {/* Garden Soil Field with Weeds */}
        <div className="relative w-full flex-grow bg-gradient-to-b from-[#8B5A2B]/20 via-[#6B4226]/30 to-[#4A2E17]/40 border-2 border-dashed border-[#2F2A2A] rounded-xl overflow-hidden min-h-[180px] sm:min-h-[220px]">
          
          {/* Fence Graphic */}
          <div className="absolute top-2 left-0 right-0 flex justify-between px-4 opacity-40 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-12 bg-[#8B5A2B] border border-[#2F2A2A] rounded-t"></div>
            ))}
          </div>

          {/* Interactive Weeds */}
          {weeds.map(w => {
            if (w.isRemoved) return null;
            return (
              <button
                key={w.id}
                onClick={() => pullWeed(w.id)}
                style={{
                  position: 'absolute',
                  left: `${w.x}%`,
                  top: `${w.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="text-2xl sm:text-3xl hover:scale-125 active:scale-95 transition-transform duration-200 cursor-pointer animate-sway p-1"
                title="Click to pull weed"
              >
                🌾
              </button>
            );
          })}

          {/* Cleared Grass Effect */}
          {isComplete && (
            <div className="absolute inset-0 bg-[#A8D8A0]/30 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-bounce-slow">
              <span className="text-5xl mb-1">✨🌸✨</span>
              <h3 className="font-pixel-title text-xs md:text-sm text-[#2F2A2A]">
                GARDEN CLEARED & HEALED!
              </h3>
            </div>
          )}
        </div>

      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center shrink-0 gap-2">
        <div className="font-pixel text-[10px] sm:text-xs text-[#2F2A2A]">
          {isComplete ? 'All 10 weeds pulled! Soil is ready.' : 'Equip tool, then pull weeds.'}
        </div>

        <button
          disabled={!isComplete}
          onClick={() => {
            soundFx.playCardFlip();
            onNext();
          }}
          className={`pixel-btn text-xs px-5 py-2.5 shadow-[3px_3px_0px_#2F2A2A] ${
            isComplete
              ? 'pixel-btn-pink opacity-100 cursor-pointer'
              : 'bg-gray-300 opacity-50 cursor-not-allowed border-gray-500'
          }`}
        >
          PLANT SEEDS <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
