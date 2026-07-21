import React, { useState } from 'react';
import { ArrowRight, Droplets, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

interface FlowerData {
  id: number;
  message: string;
  emojiBud: string;
  emojiBloom: string;
  isWatered: boolean;
}

export const WaterStage: React.FC<Props> = ({ onNext }) => {
  const [flowers, setFlowers] = useState<FlowerData[]>([
    { id: 1, message: 'Thank you for always listening.', emojiBud: '🌱', emojiBloom: '🌸', isWatered: false },
    { id: 2, message: 'Thank you for making me smile.', emojiBud: '🌱', emojiBloom: '🌷', isWatered: false },
    { id: 3, message: 'You made ordinary days special.', emojiBud: '🌱', emojiBloom: '🌻', isWatered: false },
    { id: 4, message: 'You stayed beside me.', emojiBud: '🌱', emojiBloom: '🌺', isWatered: false },
    { id: 5, message: 'You believed in me.', emojiBud: '🌱', emojiBloom: '🌼', isWatered: false },
    { id: 6, message: 'You made feel safe.', emojiBud: '🌱', emojiBloom: '🌹', isWatered: false },
    { id: 7, message: 'You loved me.', emojiBud: '🌱', emojiBloom: '🪻', isWatered: false },
    { id: 8, message: 'Thank you for being you.', emojiBud: '🌱', emojiBloom: '🌸', isWatered: false }
  ]);

  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isWateringCanEquipped, setIsWateringCanEquipped] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const wateredCount = flowers.filter(f => f.isWatered).length;
  const isComplete = wateredCount === 8;

  const equipTool = () => {
    soundFx.playClick();
    setIsWateringCanEquipped(true);
    setErrorMessage(null);
  };

  const waterFlower = (id: number) => {
    if (!isWateringCanEquipped) {
      setErrorMessage("⚠️ Please equip the Watering Can from the shelf first! 🪴");
      soundFx.playClick(); // play error chirp
      return;
    }

    soundFx.playWater();
    setFlowers(prev =>
      prev.map(f => {
        if (f.id === id) {
          if (!f.isWatered) {
            soundFx.playBloomFanfare();
          }
          return { ...f, isWatered: true };
        }
        return f;
      })
    );

    const target = flowers.find(f => f.id === id);
    if (target) {
      setActiveMessage(target.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-4 animate-page-turn justify-between overflow-y-auto lg:overflow-hidden">
      
      {/* Title Banner */}
      <div className="text-center shrink-0">
        <div className="inline-block bg-[#F7A8B8] border-3 border-[#2F2A2A] px-6 py-1.5 rounded-full shadow-[4px_4px_0px_#2F2A2A]">
          <h2 className="font-pixel-title text-xs md:text-sm text-[#2F2A2A] flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-600 fill-blue-500" />
            WATER THE FLOWERS
            <Droplets className="w-4 h-4 text-blue-600 fill-blue-500" />
          </h2>
        </div>
      </div>

      {/* Main Interactive Garden Container */}
      <div className={`pixel-box border-4 border-[#2F2A2A] shadow-[6px_6px_0px_#2F2A2A] p-3 sm:p-4 md:p-5 flex-grow flex flex-col justify-between transition-colors duration-700 ${
        isComplete ? 'bg-[#A8D8A0]/40' : 'bg-[#FFF7E9]'
      }`}>

        {/* Shelves to pick up can */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 bg-[#FFF8F0] p-2 sm:p-3 rounded-xl border-2 border-[#2F2A2A] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={equipTool}
              className={`p-3 rounded-xl border-3 border-[#2F2A2A] shadow-[3px_3px_0px_#2F2A2A] transition-all cursor-pointer ${
                isWateringCanEquipped ? 'bg-[#FFE28A] scale-105 ring-4 ring-[#F7A8B8]' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl sm:text-3xl animate-bounce-slow">🪴</span>
            </button>
            <div>
              <div className="font-pixel text-xs font-bold text-[#2F2A2A]">
                {isWateringCanEquipped ? '✅ Watering Can Equipped!' : '👉 Click to pick up the Watering Can!'}
              </div>
              <div className="font-pixel text-[10px] text-[#2F2A2A]/70">
                You must equip the can first to water the buds.
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center gap-3">
            <div className="font-pixel text-xs font-bold text-[#2F2A2A]">
              Progress: {wateredCount}/8
            </div>
            <div className="w-24 sm:w-32 h-4 sm:h-4.5 bg-white border-2 border-[#2F2A2A] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-[#A8D8A0] rounded-full transition-all duration-500"
                style={{ width: `${(wateredCount / 8) * 100}%` }}
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

        {/* Message Banner */}
        <div className="my-1 sm:my-2 h-10 sm:h-14 flex items-center justify-center shrink-0">
          {activeMessage ? (
            <div className="w-full bg-[#F7A8B8] border-2 border-[#2F2A2A] p-2 sm:p-2.5 rounded-xl shadow-[3px_3px_0px_#2F2A2A] text-center font-handwriting text-lg sm:text-xl md:text-2xl text-[#2F2A2A] animate-bounce-slow">
              "{activeMessage}"
            </div>
          ) : (
            <div className="text-xs font-pixel text-[#2F2A2A]/60 italic">
              {isWateringCanEquipped ? 'Click a flower bud to water it!' : 'Pick up the tool above to start.'}
            </div>
          )}
        </div>

        {/* Garden Flower Grid (8 Flowers) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 my-auto flex-grow items-center">
          {flowers.map(f => (
            <div
              key={f.id}
              onClick={() => waterFlower(f.id)}
              className={`pixel-box p-2 sm:p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                f.isWatered
                  ? 'bg-[#FFF8F0] border-2 border-[#2F2A2A] shadow-[3px_3px_0px_#2F2A2A]'
                  : 'bg-[#FFF7E9] border-2 border-dashed border-[#2F2A2A] opacity-90'
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-1.5 transition-all duration-300 transform hover:scale-110">
                {f.isWatered ? f.emojiBloom : f.emojiBud}
              </div>
              <div className="font-pixel text-[10px] text-center text-[#2F2A2A] font-bold">
                {f.isWatered ? `Flower #${f.id}` : `Bud #${f.id}`}
              </div>
              {f.isWatered && (
                <div className="text-[9px] font-pixel text-[#F7A8B8] mt-0.5 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> Bloomed!
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Complete State Banner */}
        {isComplete && (
          <div className="mt-3 bg-[#A8D8A0] border-2 border-[#2F2A2A] p-2.5 rounded-xl text-center shadow-[3px_3px_0px_#2F2A2A] animate-bounce-slow shrink-0">
            <h3 className="font-pixel-title text-[10px] sm:text-xs text-[#2F2A2A]">
              🌸 THE GARDEN IS BLOOMING! 🌸
            </h3>
          </div>
        )}

      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center shrink-0 gap-2">
        <div className="font-pixel text-[10px] sm:text-xs text-[#2F2A2A]">
          {isComplete ? 'All 8 flowers watered! ✨' : 'Equip tool, then water flowers.'}
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
          CONTINUE TO WEEDS <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
