import React from 'react';
import { Play, Heart, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Props {
  onStart: () => void;
  onContinue: () => void;
}

export const HomeStage: React.FC<Props> = ({ onStart, onContinue }) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 sm:gap-6 animate-page-turn justify-center py-2 sm:py-4 overflow-y-auto lg:overflow-hidden">

      {/* Main Grid: Simplified, spacious layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch my-auto">
        
        {/* LEFT: Pixel Browser Window */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="w-full h-full pixel-box p-0 bg-[#CDB4FF] overflow-hidden shadow-[6px_6px_0px_#2F2A2A] flex flex-col justify-between">
            {/* Header */}
            <div className="bg-[#2F2A2A] text-white px-4 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#F7A8B8] inline-block border border-black"></span>
                <span className="w-3 h-3 rounded-full bg-[#FFE28A] inline-block border border-black"></span>
                <span className="w-3 h-3 rounded-full bg-[#A8D8A0] inline-block border border-black"></span>
              </div>
              <span className="font-pixel text-xs text-[#FFF7E9] truncate max-w-[180px]">
                welcome.to.our.little.garden
              </span>
              <span className="text-xs">✨</span>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 bg-gradient-to-b from-[#bde0fe] via-[#e2afff] to-[#a8d8a0] flex flex-col items-center justify-between flex-grow relative border-t-2 border-[#2F2A2A] min-h-[200px] sm:min-h-[260px]">
              <div className="w-full flex justify-between items-center text-xs font-pixel text-[#2F2A2A]">
                <span className="animate-cloud bg-white/85 px-3 py-0.5 rounded-full border border-[#2F2A2A]">☁️ sunny sky</span>
                <span className="animate-bounce-slow text-xl">🦋</span>
              </div>

              {/* Illustration */}
              <div className="relative my-auto flex items-end justify-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-[#A8D8A0] rounded-full border-3 border-[#2F2A2A] shadow-inner flex items-center justify-center text-3xl animate-sway">
                    🌳
                  </div>
                  <div className="w-5 h-8 bg-[#8B5A2B] border-x-3 border-[#2F2A2A]"></div>
                </div>

                <div className="flex gap-2 text-3xl animate-bounce-slow">
                  <span>🌸</span>
                  <span>🌷</span>
                  <span>🌻</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onStart();
                }}
                className="w-full pixel-btn pixel-btn-pink justify-center text-[10px] sm:text-xs py-2.5 sm:py-3 shadow-[4px_4px_0px_#2F2A2A] cursor-pointer"
              >
                🌸 START JOURNEY 🌸
              </button>
            </div>
          </div>
        </div>

        {/* CENTER: Title & Buttons */}
        <div className="lg:col-span-4 flex flex-col items-center text-center justify-center gap-4 sm:gap-6 py-2 sm:py-4 lg:col-span-4 h-full order-first lg:order-none">
          {/* Main Title */}
          <div className="flex flex-col items-center gap-5 w-full my-auto">
            <div>
               <h1 className="font-pixel-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F7A8B8] drop-shadow-[4px_4px_0px_#2F2A2A] tracking-wider leading-tight">
                OUR LITTLE<br />GARDEN
              </h1>
            </div>

            {/* Subtitle Ribbon */}
            <div className="bg-[#F7A8B8] border-3 border-[#2F2A2A] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-[3px_3px_0px_#2F2A2A] inline-flex items-center gap-1.5 sm:gap-2">
              <Heart className="w-4 h-4 text-[#2F2A2A] fill-[#2F2A2A] animate-pulse" />
              <span className="font-pixel text-xs sm:text-sm text-[#2F2A2A] tracking-wide font-bold">
                A TINY WORLD MADE FOR YOU
              </span>
              <Heart className="w-4 h-4 text-[#2F2A2A] fill-[#2F2A2A] animate-pulse" />
            </div>

            {/* Memory Card */}
            <div className="w-full max-w-sm pixel-box bg-[#FFF7E9] p-3 sm:p-4 text-center border-3 border-[#2F2A2A] shadow-[4px_4px_0px_#2F2A2A] relative">
              <div className="tape-accent tape-top-left"></div>
              <div className="tape-accent tape-top-right"></div>
              <p className="font-pixel text-xs sm:text-sm text-[#2F2A2A]">
                Every flower hides a memory ❤️
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row sm:flex-col w-full max-w-xs gap-2 sm:gap-3 mt-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onStart();
                }}
                className="w-full pixel-btn pixel-btn-pink justify-center text-[10px] sm:text-xs py-2.5 sm:py-3.5 shadow-[4px_4px_0px_#2F2A2A] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                START
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onContinue();
                }}
                className="w-full pixel-btn pixel-btn-lavender justify-center text-[10px] sm:text-xs py-2.5 sm:py-3.5 shadow-[4px_4px_0px_#2F2A2A] cursor-pointer"
              >
                💌 CONTINUE
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: About Notebook */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="w-full h-full pixel-box bg-[#FFF7E9] p-3 sm:p-5 border-3 border-[#2F2A2A] shadow-[6px_6px_0px_#2F2A2A] flex flex-col justify-between relative">
            <div className="tape-accent tape-top-right"></div>
            
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-dashed border-[#2F2A2A]">
                <BookOpen className="w-4 h-4 text-[#F7A8B8]" />
                <h2 className="font-pixel-title text-xs text-[#2F2A2A]">ABOUT THIS GAME</h2>
              </div>

              <p className="font-handwriting text-base sm:text-lg md:text-xl text-[#2F2A2A] leading-relaxed mb-3 sm:mb-4">
                Hi Love ❤️<br />
                I made this tiny little world just for you. It's my way of saying sorry. Every flower, memory, and interaction comes from my heart. I hope you'll walk through this little garden with me.
              </p>

              <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs font-pixel mb-3 sm:mb-4">
                <div className="font-bold text-[#2F2A2A] mb-1">Journey Checklist:</div>
                <div className="flex items-center gap-2 text-[#2F2A2A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A8D8A0]" /> Water flowers
                </div>
                <div className="flex items-center gap-2 text-[#2F2A2A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A8D8A0]" /> Remove weeds
                </div>
                <div className="flex items-center gap-2 text-[#2F2A2A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A8D8A0]" /> Plant seeds & watch garden bloom
                </div>
                <div className="flex items-center gap-2 text-[#2F2A2A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A8D8A0]" /> Read my letter
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-pixel pt-2 border-t-2 border-dashed border-[#2F2A2A] text-[#2F2A2A] shrink-0">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#F7A8B8]" /> Est. Time
              </span>
              <span className="bg-[#FFE28A] px-2.5 py-0.5 rounded border border-[#2F2A2A] font-bold">
                10 mins
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Simplified clean footer */}
      <footer className="text-center font-pixel text-[10px] sm:text-xs text-[#2F2A2A]/70 pt-3 sm:pt-4 border-t border-dashed border-[#2F2A2A]/20 shrink-0">
        Made with love ❤️ • Let's grow together 🌸
      </footer>

    </div>
  );
};
