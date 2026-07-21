import React, { useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

interface MemoryCard {
  id: number;
  flowerEmoji: string;
  memoryText: string;
  isFlipped: boolean;
}

export const MemoriesStage: React.FC<Props> = ({ onNext }) => {
  const [cards, setCards] = useState<MemoryCard[]>([
    { id: 1, flowerEmoji: '🌸', memoryText: 'Thank you for always listening to me even i was not kind to you', isFlipped: false },
    { id: 2, flowerEmoji: '🌷', memoryText: "I still smile when I think about how our story began. I had no idea that one day you'd become so important to me.", isFlipped: false },
    { id: 3, flowerEmoji: '🌻', memoryText: 'I love you more than words can express, and I can\'t wait to see what the future holds for us.', isFlipped: false },
    { id: 4, flowerEmoji: '🌺', memoryText: 'Even on the days when things weren\'t perfect, you were always there to make me laugh.', isFlipped: false },
    { id: 5, flowerEmoji: '🌼', memoryText: 'Thank you for believing in me, especially during the moments when I doubted myself.', isFlipped: false },
    { id: 6, flowerEmoji: '🌹', memoryText: 'Some of my favorite memories are just us talking until neither of us wanted to say goodnight.', isFlipped: false },
    { id: 7, flowerEmoji: '🪻', memoryText: 'I still smile when I think about how our story began. I had no idea that one day you\'d become so important to me.', isFlipped: false },
    { id: 8, flowerEmoji: '⭐', memoryText: 'My favorite memory hasn\'t happened yet. I hope we still have countless beautiful moments waiting for us.', isFlipped: false }
  ]);

  const flippedCount = cards.filter(c => c.isFlipped).length;
  const isComplete = flippedCount === 8;

  const flipCard = (id: number) => {
    soundFx.playCardFlip();
    setCards(prev =>
      prev.map(c => (c.id === id ? { ...c, isFlipped: !c.isFlipped } : c))
    );
  };

  const collectAllMemories = () => {
    soundFx.playBloomFanfare();
    setCards(prev => prev.map(c => ({ ...c, isFlipped: true })));
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-4 animate-page-turn justify-between overflow-y-auto lg:overflow-hidden">
      
      {/* Header Banner */}
      <div className="text-center shrink-0">
        <div className="inline-block bg-[#CDB4FF] border-3 border-[#2F2A2A] px-6 py-1.5 rounded-full shadow-[4px_4px_0px_#2F2A2A]">
          <h2 className="font-pixel-title text-xs md:text-sm text-[#2F2A2A] flex items-center gap-2">
            <span>📷</span> MEMORY COLLECTION <span>🌸</span>
          </h2>
        </div>
      </div>

      {/* Main Memory Album Container */}
      <div className="pixel-box bg-[#FFF7E9] border-4 border-[#2F2A2A] shadow-[6px_6px_0px_#2F2A2A] p-3 sm:p-4 md:p-5 flex-grow flex flex-col justify-between relative overflow-hidden">
        <div className="tape-accent tape-top-left"></div>
        <div className="tape-accent tape-top-right"></div>

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 bg-[#FFF8F0] p-2 sm:p-3 rounded-xl border-2 border-[#2F2A2A] shrink-0">
          <div className="flex items-center gap-2 font-pixel text-[10px] sm:text-xs text-[#2F2A2A] font-bold">
            <Heart className="w-4 h-4 text-[#F7A8B8] fill-[#F7A8B8]" />
            <span>Tap each flower card to flip & reveal the memory inside!</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={collectAllMemories}
              className="pixel-btn pixel-btn-yellow text-xs py-1.5 px-3 shadow-[2px_2px_0px_#2F2A2A] cursor-pointer"
            >
              Collect All
            </button>
            <span className="font-pixel text-xs font-bold text-[#2F2A2A]">
              Collected: {flippedCount}/8
            </span>
          </div>
        </div>

        {/* 8 Memory Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 my-auto flex-grow items-center">
          {cards.map(c => (
            <div
              key={c.id}
              onClick={() => flipCard(c.id)}
              className="h-28 sm:h-32 md:h-36 cursor-pointer"
            >
              <div
                className={`w-full h-full relative duration-500 transition-transform ${
                  c.isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: c.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* CARD FRONT */}
                <div
                  className="absolute inset-0 pixel-box bg-[#F7A8B8] border-2 border-[#2F2A2A] p-2 flex flex-col items-center justify-between shadow-[3px_3px_0px_#2F2A2A]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-full flex justify-between text-[10px] font-pixel text-[#2F2A2A]">
                    <span>Card #{c.id}</span>
                    <span>✨</span>
                  </div>
                  <div className="text-3xl sm:text-4xl animate-bounce-slow my-auto">
                    {c.flowerEmoji}
                  </div>
                  <div className="font-pixel text-[9px] bg-white/80 px-1.5 py-0.5 rounded border border-[#2F2A2A]">
                    Flip
                  </div>
                </div>

                {/* CARD BACK */}
                <div
                  className="absolute inset-0 pixel-box bg-[#FFE28A] border-2 border-[#2F2A2A] p-3 flex flex-col items-center justify-between shadow-[3px_3px_0px_#2F2A2A] text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="w-full text-left text-[10px] font-pixel text-[#2F2A2A]">
                    Memory #{c.id} ❤️
                  </div>
                  <div className="font-handwriting text-sm sm:text-base text-[#2F2A2A] my-auto leading-tight">
                    "{c.memoryText}"
                  </div>
                  <div className="text-xs text-[#2F2A2A]">🌸</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Golden Flower Reveal Banner */}
        {isComplete && (
          <div className="mt-3 bg-[#FFE28A] border-2 border-[#2F2A2A] p-2.5 rounded-xl text-center shadow-[3px_3px_0px_#2F2A2A] animate-bounce-slow flex items-center justify-center gap-2 shrink-0">
            <span className="text-2xl">🌟🌸🌟</span>
            <h3 className="font-pixel-title text-[10px] sm:text-xs text-[#2F2A2A]">
              GOLDEN FLOWER UNLOCKED!
            </h3>
          </div>
        )}

      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center shrink-0 gap-2">
        <div className="font-pixel text-[10px] sm:text-xs text-[#2F2A2A]">
          {isComplete ? 'All 8 memories collected! 🌟' : 'Flip all memory cards to proceed.'}
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
          READ FINAL LETTER <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
