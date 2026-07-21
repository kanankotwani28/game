import React, { useEffect } from 'react';
import { ArrowRight, Sun } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export const BloomsStage: React.FC<Props> = ({ onNext }) => {
  useEffect(() => {
    soundFx.playBloomFanfare();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-4 animate-page-turn justify-between overflow-y-auto lg:overflow-hidden">
      
      {/* Title Header */}
      <div className="text-center shrink-0">
        <div className="inline-block bg-[#F7A8B8] border-3 border-[#2F2A2A] px-6 py-1.5 rounded-full shadow-[4px_4px_0px_#2F2A2A]">
          <h2 className="font-pixel-title text-xs md:text-sm text-[#2F2A2A] flex items-center gap-2">
            <span>✨</span> THE GARDEN BLOOMS <span>✨</span>
          </h2>
        </div>
      </div>

      {/* Main Full Bloom Scene */}
      <div className="pixel-box bg-gradient-to-b from-[#dbeafe] via-[#fbcfe8] to-[#a8d8a0] border-4 border-[#2F2A2A] shadow-[6px_6px_0px_#2F2A2A] p-3 sm:p-4 md:p-6 flex-grow flex flex-col items-center justify-between relative overflow-hidden">
        
        {/* Sun & Ray Effects */}
        <div className="absolute top-4 right-8 flex items-center gap-2 animate-spin" style={{ animationDuration: '20s' }}>
          <Sun className="w-10 h-10 text-[#FFE28A] fill-[#FFE28A]" />
        </div>

        {/* Flying Birds & Butterflies */}
        <div className="w-full flex justify-between px-4 sm:px-8 text-lg sm:text-xl md:text-2xl animate-cloud shrink-0">
          <span>🕊️</span>
          <span>🦋</span>
          <span>🐝</span>
          <span>🦋</span>
        </div>

        {/* Centerpiece: Huge Blossoming Tree & Flower Field */}
        <div className="relative my-auto flex flex-col items-center justify-center flex-grow">
          {/* Huge Blossom Tree */}
          <div className="relative flex flex-col items-center mb-2">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-[#F7A8B8] rounded-full border-3 border-[#2F2A2A] shadow-lg flex items-center justify-center text-3xl sm:text-5xl animate-sway relative">
              🌸
              <div className="absolute -top-1 -right-1 text-sm sm:text-xl animate-pulse">✨</div>
              <div className="absolute -bottom-1 -left-1 text-sm sm:text-xl animate-pulse">💖</div>
            </div>
            <div className="w-4 h-7 sm:w-6 sm:h-10 bg-[#8B5A2B] border-x-3 border-b-3 border-[#2F2A2A] rounded-b"></div>
          </div>

          {/* Lush Flower Bed */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 text-xl sm:text-2xl md:text-3xl animate-bounce-slow">
            <span>🌷</span>
            <span>🌸</span>
            <span>🌻</span>
            <span>🌺</span>
            <span>🌼</span>
            <span>🌹</span>
            <span>🪻</span>
          </div>
        </div>

        {/* Central Heartfelt Card */}
        <div className="w-full max-w-sm bg-[#FFF7E9]/95 border-3 border-[#2F2A2A] p-3 sm:p-4 md:p-5 rounded-2xl shadow-[4px_4px_0px_#2F2A2A] text-center relative shrink-0">
          <div className="tape-accent tape-top-left"></div>
          <div className="tape-accent tape-top-right"></div>

          <p className="font-handwriting text-lg sm:text-xl md:text-2xl text-[#2F2A2A] leading-relaxed">
            Even after storms,<br />
            gardens can bloom again.<br />
            <span className="font-bold text-[#F7A8B8]">If they're cared for. ❤️</span>
          </p>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center shrink-0 gap-2">
        <div className="font-pixel text-[10px] sm:text-xs text-[#2F2A2A]">
          Garden is fully healed and blooming! ✨
        </div>

        <button
          onClick={() => {
            soundFx.playCardFlip();
            onNext();
          }}
          className="pixel-btn pixel-btn-pink text-xs px-5 py-2.5 shadow-[3px_3px_0px_#2F2A2A]"
        >
          MEMORY COLLECTION <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
