import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, Moon } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Props {
  onPlayAgain: () => void;
}

export const LetterStage: React.FC<Props> = ({ onPlayAgain }) => {
  const [isBloomTriggered, setIsBloomTriggered] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>('');

  const fullLetter = `Hi Love,

Thank you for walking through this little garden with me.

I know I made mistakes. I'm truly sorry for hurting you.
If I could go back, I'd choose kinder words, more patience, and better understanding.

I can't change the past. But I can learn from it. I can grow. Just like this little garden.
Thank you for loving me. Thank you for staying through both sunshine and storms.

If you're willing, I'd love to keep growing this garden with you.
No matter what happens, you'll always be one of the most beautiful flowers in my life.

I love you. ❤️`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullLetter.length) {
        setDisplayedText(fullLetter.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 15);

    return () => clearInterval(timer);
  }, []);

  const triggerGrandBloom = () => {
    soundFx.playClimaxFanfare();
    setIsBloomTriggered(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#F7A8B8', '#CDB4FF', '#FFE28A']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#A8D8A0', '#FFF7E9', '#F7A8B8']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#FFE28A', '#F7A8B8', '#CDB4FF']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 animate-page-turn justify-between">
      
      {/* Night Sky Header */}
      <div className="text-center shrink-0">
        <div className="inline-block bg-[#2F2A2A] text-[#FFF7E9] border-3 border-[#2F2A2A] px-6 py-1.5 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
          <h2 className="font-pixel-title text-xs md:text-sm flex items-center gap-2">
            <Moon className="w-4 h-4 text-[#FFE28A] fill-[#FFE28A]" />
            FINAL LETTER
            <Sparkles className="w-4 h-4 text-[#CDB4FF]" />
          </h2>
        </div>
      </div>

      {/* Cozy Night Journal Page */}
      <div className="pixel-box bg-[#FFF7E9] border-4 border-[#2F2A2A] shadow-[6px_6px_0px_#2F2A2A] p-4 sm:p-6 flex-grow flex flex-col justify-between relative overflow-y-auto max-h-[500px]">
        <div className="tape-accent tape-top-left"></div>
        <div className="tape-accent tape-top-right"></div>

        {/* Notebook Lines & Letter Text */}
        <div className="font-handwriting text-xl sm:text-2xl text-[#2F2A2A] leading-relaxed whitespace-pre-line flex-grow">
          {displayedText}
          <span className="animate-pulse">|</span>
        </div>

        {/* Interactive Pixel Flower Button */}
        <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2F2A2A] flex flex-col items-center gap-3 shrink-0">
          <p className="font-pixel text-[10px] text-[#2F2A2A]/80 text-center">
            Click the golden blossom to bloom the garden forever ✨
          </p>

          <button
            onClick={triggerGrandBloom}
            className={`pixel-btn pixel-btn-pink text-xs px-6 py-3 shadow-[4px_4px_0px_#2F2A2A] transform hover:scale-105 active:scale-95 transition-all ${
              isBloomTriggered ? 'animate-bounce-slow bg-[#FFE28A]' : ''
            }`}
          >
            <span className="text-2xl">🌸</span>
            <span>{isBloomTriggered ? 'GARDEN BLOOMED!' : 'BLOOM OUR GARDEN'}</span>
            <span className="text-2xl">🌸</span>
          </button>
        </div>

        {/* Final Climax Message Overlay */}
        {isBloomTriggered && (
          <div className="mt-4 bg-[#F7A8B8] border-2 border-[#2F2A2A] p-4 rounded-xl text-center shadow-[4px_4px_0px_#2F2A2A] animate-bounce-slow shrink-0">
            <p className="font-handwriting text-2xl text-[#2F2A2A]">
              Thank you for reaching the end.<br />
              I hope this little garden made you smile. 🌸
            </p>
          </div>
        )}

      </div>

      {/* Footer Play Again Controls */}
      <div className="flex justify-between items-center shrink-0">
        <div className="font-pixel text-xs text-[#2F2A2A]">
          Made with love ❤️
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onPlayAgain();
          }}
          className="pixel-btn pixel-btn-lavender text-xs px-5 py-2.5 shadow-[3px_3px_0px_#2F2A2A]"
        >
          <RotateCcw className="w-4 h-4" /> PLAY AGAIN
        </button>
      </div>

    </div>
  );
};
