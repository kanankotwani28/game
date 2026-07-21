import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export const StoryStage: React.FC<Props> = ({ onNext }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: true
  });

  const [stickers, setStickers] = useState([
    { id: 1, emoji: '🌸', x: 25, y: 20, rotate: -12, scale: 1 },
    { id: 2, emoji: '❤️', x: 75, y: 30, rotate: 15, scale: 1 },
    { id: 3, emoji: '🦋', x: 35, y: 70, rotate: -8, scale: 1 },
    { id: 4, emoji: '🧸', x: 75, y: 75, rotate: 10, scale: 1 },
    { id: 5, emoji: '🌈', x: 50, y: 15, rotate: 5, scale: 1 },
    { id: 6, emoji: '⭐', x: 20, y: 80, rotate: -18, scale: 1 },
    { id: 7, emoji: '🐝', x: 80, y: 50, rotate: 12, scale: 1 }
  ]);

  const toggleCheck = (idx: number) => {
    soundFx.playClick();
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const popSticker = (id: number) => {
    soundFx.playClick();
    setStickers(prev =>
      prev.map(s => (s.id === id ? { ...s, scale: s.scale === 1 ? 1.3 : 1 } : s))
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-4 animate-page-turn justify-between overflow-y-auto lg:overflow-hidden">
      
      {/* Title Header */}
      <div className="text-center shrink-0">
        <div className="inline-block bg-[#F7A8B8] border-3 border-[#2F2A2A] px-6 py-1.5 rounded-full shadow-[4px_4px_0px_#2F2A2A]">
          <h2 className="font-pixel-title text-xs md:text-sm text-[#2F2A2A] flex items-center gap-2">
            <span>📖</span> OUR STORY <span>🌸</span>
          </h2>
        </div>
      </div>

      {/* Main Scrapbook Box */}
      <div className="pixel-box bg-[#FFF7E9] border-4 border-[#2F2A2A] shadow-[6px_6px_0px_#2F2A2A] p-3 sm:p-4 md:p-6 relative overflow-hidden flex-grow flex flex-col justify-between">
        <div className="tape-accent tape-top-left"></div>
        <div className="tape-accent tape-top-right"></div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch flex-grow my-auto">
          
          {/* LEFT: Polaroid Photo */}
          <div className="md:col-span-4 flex flex-col items-center justify-center pt-2 hidden sm:flex">
            <div className="polaroid w-full max-w-[210px] bg-white cursor-pointer" onClick={() => soundFx.playClick()}>
              <div className="w-full h-40 bg-gradient-to-tr from-[#fbcfe8] via-[#e0e7ff] to-[#fef08a] border-2 border-[#2F2A2A] rounded flex flex-col items-center justify-center p-3 relative overflow-hidden">
                <div className="text-4xl animate-bounce-slow mb-1">🌸</div>
                <div className="text-lg flex gap-1.5">
                  <span>✨</span>
                  <span>❤️</span>
                  <span>✨</span>
                </div>
              </div>
              <div className="polaroid-caption text-center pt-1.5 text-lg">
                The beginning 🌸
              </div>
            </div>
          </div>

          {/* CENTER: Large Journal Page */}
          <div className="md:col-span-5 flex flex-col justify-center text-[#2F2A2A]">
            <h3 className="font-pixel-title text-xs md:text-sm text-[#F7A8B8] drop-shadow-[2px_2px_0px_#2F2A2A] mb-2 border-b border-dashed border-[#2F2A2A] pb-1.5">
              How Our Garden Started
            </h3>

            <div className="font-handwriting text-base sm:text-lg lg:text-xl leading-relaxed space-y-1.5 sm:space-y-2">
              <p>Every beautiful garden starts with one tiny seed.</p>
              <p>Ours started with two people, two hearts, and countless little moments.</p>
              <p>Every laugh, every late-night conversation, every memory, every smile, became another flower.</p>
              <p className="font-bold text-[#F7A8B8] drop-shadow-[1px_1px_0px_#2F2A2A]">
                Slowly, without even realizing, we built something beautiful together.
              </p>
            </div>
          </div>

          {/* RIGHT: Interactive Sticker Board */}
          <div className="md:col-span-3 flex flex-col items-center justify-center">
            <div className="w-full bg-[#FFF8F0] border-2 border-[#2F2A2A] p-2.5 rounded-xl shadow-[3px_3px_0px_#2F2A2A]">
              <div className="font-pixel text-[10px] text-[#2F2A2A] font-bold mb-1 pb-0.5 border-b border-[#2F2A2A] text-center">
                ✨ STICKERS ✨
              </div>

              <div className="relative w-full h-36 border border-dashed border-[#2F2A2A]/40 rounded-lg overflow-hidden bg-white/60">
                {stickers.map(s => (
                  <button
                    key={s.id}
                    onClick={() => popSticker(s.id)}
                    style={{
                      position: 'absolute',
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      transform: `translate(-50%, -50%) rotate(${s.rotate}deg) scale(${s.scale})`,
                      transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    className="text-xl hover:opacity-80 active:scale-125 cursor-pointer"
                  >
                    {s.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM: Notebook Checklist */}
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t-2 border-dashed border-[#2F2A2A] grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 shrink-0">
          {[
            'We laughed',
            'We cared',
            'We dreamed',
            'We grew together'
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`p-1.5 sm:p-2 rounded-lg border-2 border-[#2F2A2A] font-pixel text-[10px] sm:text-[11px] flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all ${
                checkedItems[idx]
                  ? 'bg-[#A8D8A0] text-[#2F2A2A] shadow-[2px_2px_0px_#2F2A2A]'
                  : 'bg-[#FFF8F0] text-[#2F2A2A]/60'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded border border-[#2F2A2A] flex items-center justify-center font-bold text-[9px] ${
                checkedItems[idx] ? 'bg-[#FFE28A]' : 'bg-white'
              }`}>
                {checkedItems[idx] ? '✓' : ''}
              </div>
              <span className="font-bold truncate">{item}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center shrink-0 gap-2">
        <div className="font-pixel text-[10px] sm:text-[11px] text-[#2F2A2A]/80">
          Scrapbook Page 2 of 8
        </div>

        <button
          onClick={() => {
            soundFx.playCardFlip();
            onNext();
          }}
          className="pixel-btn pixel-btn-pink text-xs px-5 py-2.5 shadow-[3px_3px_0px_#2F2A2A]"
        >
          WATER THE FLOWERS <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
