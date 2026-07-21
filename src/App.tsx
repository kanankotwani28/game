import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/Cursor';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { HomeStage } from './components/stages/HomeStage';
import { StoryStage } from './components/stages/StoryStage';
import { WaterStage } from './components/stages/WaterStage';
import { WeedsStage } from './components/stages/WeedsStage';
import { SeedsStage } from './components/stages/SeedsStage';
import { BloomsStage } from './components/stages/BloomsStage';
import { MemoriesStage } from './components/stages/MemoriesStage';
import { LetterStage } from './components/stages/LetterStage';
import { soundFx } from './utils/audio';

export const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [unlockedStage, setUnlockedStage] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.isMuted);

  const handleToggleMute = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleSelectStage = (stage: number) => {
    if (stage <= unlockedStage) {
      setCurrentStage(stage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const unlockNextStage = (nextStage: number) => {
    if (nextStage > unlockedStage) {
      setUnlockedStage(nextStage);
    }
    setCurrentStage(nextStage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start background music on user's first click anywhere
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundFx.startLofiMusic();
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-[#FFF8F0]
        text-[#2F2A2A]
        relative
        overflow-x-hidden
        selection:bg-[#F7A8B8]
        flex
        flex-col
        pl-6 pr-6
        sm:pl-10 sm:pr-10
        md:pl-16 md:pr-16
        lg:pl-20 lg:pr-20
        xl:pl-24 xl:pr-24
      "
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Canvas Particle Background */}
      <ParticleBackground isNight={currentStage === 8} />

      {/* Top Navbar */}
      <Navbar
        currentStage={currentStage}
        unlockedStage={unlockedStage}
        totalStages={8}
        onSelectStage={handleSelectStage}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content */}
      <main className="flex-grow relative z-10 py-3 sm:py-4 mt-1 sm:mt-2 md:mt-4 w-full max-w-6xl mx-auto flex flex-col justify-stretch lg:h-[calc(100vh-5rem)] lg:overflow-hidden overflow-y-auto">
        {currentStage === 1 && (
          <HomeStage
            onStart={() => unlockNextStage(2)}
            onContinue={() => handleSelectStage(unlockedStage)}
          />
        )}

        {currentStage === 2 && (
          <StoryStage onNext={() => unlockNextStage(3)} />
        )}

        {currentStage === 3 && (
          <WaterStage onNext={() => unlockNextStage(4)} />
        )}

        {currentStage === 4 && (
          <WeedsStage onNext={() => unlockNextStage(5)} />
        )}

        {currentStage === 5 && (
          <SeedsStage onNext={() => unlockNextStage(6)} />
        )}

        {currentStage === 6 && (
          <BloomsStage onNext={() => unlockNextStage(7)} />
        )}

        {currentStage === 7 && (
          <MemoriesStage onNext={() => unlockNextStage(8)} />
        )}

        {currentStage === 8 && (
          <LetterStage
            onPlayAgain={() => {
              setUnlockedStage(1);
              setCurrentStage(1);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default App;