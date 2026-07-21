import React, { useState } from 'react';
import { Volume2, VolumeX, Lock, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Props {
  currentStage: number;
  unlockedStage: number;
  totalStages: number;
  onSelectStage: (stage: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentStage,
  unlockedStage,
  onSelectStage,
  isMuted,
  onToggleMute
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stageTitles = [
    'Home',
    'Our Story',
    'Water Flowers',
    'Remove Weeds',
    'Plant Seeds',
    'Garden Blooms',
    'Memories',
    'Final Letter'
  ];

  const goToPrevStage = () => {
    if (currentStage > 1) {
      soundFx.playClick();
      onSelectStage(currentStage - 1);
    }
  };

  const goToNextStage = () => {
    if (currentStage < unlockedStage) {
      soundFx.playClick();
      onSelectStage(currentStage + 1);
    }
  };

  return (
    <>
      <header className="w-full h-14 sm:h-16 bg-[#FFF8F0] border-b-4 border-[#2F2A2A] shadow-md flex items-center shrink-0 z-40">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Title */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
            onClick={() => {
              soundFx.playClick();
              onSelectStage(1);
            }}
          >
            <span className="text-xl sm:text-2xl animate-bounce-slow">🌸</span>
            <h1 className="font-pixel-title text-[10px] sm:text-xs md:text-sm lg:text-base text-[#2F2A2A] tracking-wider whitespace-nowrap hidden min-[380px]:inline">
              OUR LITTLE GARDEN
            </h1>
          </div>

          {/* Center: Mobile Stage Navigator (visible on small screens) */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={goToPrevStage}
              disabled={currentStage <= 1}
              className="p-1.5 rounded-lg border-2 border-[#2F2A2A] bg-[#FFF7E9] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => {
                soundFx.playClick();
                setIsMobileMenuOpen(true);
              }}
              className="px-3 py-1 text-xs font-pixel rounded-lg border-2 border-[#2F2A2A] bg-[#F7A8B8] text-[#2F2A2A] font-bold shadow-[2px_2px_0px_#2F2A2A] whitespace-nowrap cursor-pointer active:scale-95 transition-transform"
            >
              {currentStage}/{unlockedStage} · {stageTitles[currentStage - 1]}
            </button>

            <button
              onClick={goToNextStage}
              disabled={currentStage >= unlockedStage}
              className="p-1.5 rounded-lg border-2 border-[#2F2A2A] bg-[#FFF7E9] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-transform"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center: Stage Pills (visible on md+ screens) */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto py-1.5 scrollbar-none max-w-2xl px-1">
            {stageTitles.map((title, idx) => {
              const stageNum = idx + 1;
              const isActive = stageNum === currentStage;
              const isCompleted = stageNum < currentStage;
              const isLocked = stageNum > unlockedStage;

              return (
                <button
                  key={stageNum}
                  disabled={isLocked}
                  onClick={() => {
                    if (isLocked) return;
                    soundFx.playClick();
                    onSelectStage(stageNum);
                  }}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-pixel rounded-lg border-2 border-[#2F2A2A] transition-all whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-[#F7A8B8] text-[#2F2A2A] font-bold shadow-[2px_2px_0px_#2F2A2A] -translate-y-0.5'
                      : isCompleted
                      ? 'bg-[#A8D8A0] text-[#2F2A2A] hover:bg-[#bce5b5]'
                      : isLocked
                      ? 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-[#FFF7E9] text-[#2F2A2A]/70 hover:bg-white'
                  }`}
                >
                  {stageNum}. {title}
                  {isLocked && <Lock className="w-3 h-3 ml-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Right: Audio Control Button */}
          <button
            onClick={() => {
              onToggleMute();
              soundFx.playClick();
            }}
            className="px-2 sm:px-3.5 py-1.5 bg-[#FFE28A] border-2 border-[#2F2A2A] shadow-[2px_2px_0px_#2F2A2A] rounded-lg hover:bg-[#ffd762] transition-transform active:translate-y-0.5 flex items-center gap-1.5 font-pixel text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-[#2F2A2A]" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#2F2A2A] animate-pulse" />
                <span className="hidden sm:inline">Lofi Music</span>
              </>
            )}
          </button>

        </div>
      </header>

      {/* Mobile Fullscreen Stage Selector Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFF8F0]/95 backdrop-blur-sm flex flex-col md:hidden animate-page-turn">
          {/* Overlay Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b-3 border-[#2F2A2A]">
            <h2 className="font-pixel-title text-xs text-[#2F2A2A] flex items-center gap-2">
              <span>🌸</span> SELECT STAGE
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg border-2 border-[#2F2A2A] bg-[#F7A8B8] cursor-pointer active:scale-95 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stage List */}
          <div className="flex-grow overflow-y-auto p-4 space-y-2.5">
            {stageTitles.map((title, idx) => {
              const stageNum = idx + 1;
              const isActive = stageNum === currentStage;
              const isCompleted = stageNum < currentStage;
              const isLocked = stageNum > unlockedStage;

              return (
                <button
                  key={stageNum}
                  disabled={isLocked}
                  onClick={() => {
                    if (isLocked) return;
                    soundFx.playClick();
                    onSelectStage(stageNum);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 font-pixel text-sm rounded-xl border-3 border-[#2F2A2A] transition-all flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-[#F7A8B8] text-[#2F2A2A] font-bold shadow-[3px_3px_0px_#2F2A2A]'
                      : isCompleted
                      ? 'bg-[#A8D8A0] text-[#2F2A2A]'
                      : isLocked
                      ? 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-[#FFF7E9] text-[#2F2A2A]/70'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg border-2 border-[#2F2A2A] flex items-center justify-center font-bold text-xs ${
                    isActive ? 'bg-[#FFE28A]' : isCompleted ? 'bg-white' : 'bg-white/50'
                  }`}>
                    {isCompleted ? '✓' : stageNum}
                  </span>
                  <span className="truncate">{title}</span>
                  {isLocked && <Lock className="w-3.5 h-3.5 ml-auto" />}
                  {isActive && <span className="ml-auto text-xs">◀ HERE</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
