import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

interface HoleData {
  id: number;
  promise: string;
  isPlanted: boolean;
}

export const SeedsStage: React.FC<Props> = ({ onNext }) => {
  const [holes, setHoles] = useState<HoleData[]>([
    { id: 1, promise: "I'll communicate better.", isPlanted: false },
    { id: 2, promise: "I'll listen more.", isPlanted: false },
    { id: 3, promise: "I'll be more patient.", isPlanted: false },
    { id: 4, promise: "I'll appreciate the little things.", isPlanted: false },
    { id: 5, promise: "I'll keep learning.", isPlanted: false },
    { id: 6, promise: "I'll love you better every day.", isPlanted: false }
  ]);

  const [activePromise, setActivePromise] = useState<string | null>(null);

  const plantedCount = holes.filter(h => h.isPlanted).length;
  const isComplete = plantedCount === 6;

  const plantSeed = (id: number) => {
    soundFx.playPlantSeed();
    setHoles(prev =>
      prev.map(h => {
        if (h.id === id) {
          if (!h.isPlanted) {
            soundFx.playBloomFanfare();
          }
          return { ...h, isPlanted: true };
        }
        return h;
      })
    );

    const target = holes.find(h => h.id === id);
    if (target) {
      setActivePromise(target.promise);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-4 animate-page-turn justify-between overflow-y-auto lg:overflow-hidden">
      
      {/* Header Banner */}
      <div className="text-center shrink-0">
        <div className="inline-block bg-[#A8D8A0] border-3 border-[#2F2A2A] px-6 py-1.5 rounded-full shadow-[4px_4px_0px_#2F2A2A]">
          <h2 className="font-pixel-title text-xs md:text-sm text-[#2F2A2A] flex items-center gap-2">
            <span>🌱</span> PLANT NEW SEEDS <span>✨</span>
          </h2>
        </div>
      </div>

      {/* Main Soil Container */}
      <div className="pixel-box bg-[#FFF7E9] border-4 border-[#2F2A2A] shadow-[6px_6px_0px_#2F2A2A] p-3 sm:p-4 md:p-5 flex-grow flex flex-col justify-between relative overflow-hidden">
        <div className="tape-accent tape-top-left"></div>
        <div className="tape-accent tape-top-right"></div>

        {/* Status Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 bg-[#FFF8F0] p-2 sm:p-3 rounded-xl border-2 border-[#2F2A2A] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce-slow">🫘</span>
            <div>
              <div className="font-pixel text-xs font-bold text-[#2F2A2A]">
                Fresh Soil & Sunshine!
              </div>
              <div className="font-pixel text-[10px] text-[#2F2A2A]/70">
                Click each hole to plant a seed of promise 💖
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-pixel text-xs font-bold text-[#2F2A2A]">
              Planted: {plantedCount}/6
            </span>
            <div className="w-24 sm:w-32 h-4 sm:h-4.5 bg-white border-2 border-[#2F2A2A] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-[#A8D8A0] rounded-full transition-all duration-500"
                style={{ width: `${(plantedCount / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Promise Card Display */}
        <div className="my-1 sm:my-2 h-10 sm:h-14 flex items-center justify-center shrink-0">
          {activePromise ? (
            <div className="w-full bg-[#CDB4FF] border-2 border-[#2F2A2A] p-2 sm:p-2.5 rounded-xl text-center shadow-[3px_3px_0px_#2F2A2A] font-handwriting text-lg sm:text-xl md:text-2xl text-[#2F2A2A] animate-bounce-slow">
              💌 Promise: "{activePromise}"
            </div>
          ) : (
            <div className="text-xs font-pixel text-[#2F2A2A]/60 italic">
              Plant a seed to reveal a promise...
            </div>
          )}
        </div>

        {/* Seed Holes Grid (6 Holes) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 my-auto flex-grow items-center">
          {holes.map(h => (
            <div
              key={h.id}
              onClick={() => plantSeed(h.id)}
              className={`pixel-box p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                h.isPlanted
                  ? 'bg-[#A8D8A0]/30 border-2 border-[#2F2A2A] shadow-[3px_3px_0px_#2F2A2A]'
                  : 'bg-[#8B5A2B]/20 border-2 border-dashed border-[#2F2A2A] hover:bg-[#8B5A2B]/30'
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-1.5 transition-all duration-300 transform hover:scale-110">
                {h.isPlanted ? '🌱' : '🕳️'}
              </div>

              <div className="font-pixel text-[10px] font-bold text-[#2F2A2A] text-center">
                {h.isPlanted ? h.promise : `Seed Hole #${h.id}`}
              </div>
            </div>
          ))}
        </div>

        {/* Rain & Rainbow Celebration Banner */}
        {isComplete && (
          <div className="mt-3 bg-gradient-to-r from-[#F7A8B8] via-[#CDB4FF] to-[#FFE28A] border-2 border-[#2F2A2A] p-3 rounded-xl text-center shadow-[3px_3px_0px_#2F2A2A] animate-bounce-slow shrink-0">
            <h3 className="font-pixel-title text-[10px] sm:text-xs text-[#2F2A2A]">
              AFTER THE RAIN, A RAINBOW APPEARS! 🌈
            </h3>
          </div>
        )}

      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center shrink-0 gap-2">
        <div className="font-pixel text-[10px] sm:text-xs text-[#2F2A2A]">
          {isComplete ? 'All 6 promises planted! 🌈' : 'Click soil holes to plant seeds.'}
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
          WATCH GARDEN BLOOM <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
