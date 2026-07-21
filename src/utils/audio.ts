// Web Audio API Sound Synthesizer & Lofi Music Generator

class SoundManager {
  private ctx: AudioContext | null = null;
  private musicInterval: number | null = null;
  public isMuted: boolean = false;
  private musicNoteIndex: number = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play short retro synth tone
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context fallbacks
    }
  }

  // Play watering sound
  public playWater() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [300, 450, 600, 520].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + i * 0.06 + 0.08);

        gain.gain.setValueAtTime(0.15, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.08);
      });
    } catch {
      // Audio fallback
    }
  }

  // Play weed pull pop sound
  public playWeedPull() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.12);
    } catch {
      // Fallback
    }
  }

  // Play planting seed sound
  public playPlantSeed() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.1, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.15);
      });
    } catch {
      // Fallback
    }
  }

  // Play card flip sound
  public playCardFlip() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(550, now + 0.07);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.07);
    } catch {
      // Fallback
    }
  }

  // Play magical blooming fanfare
  public playBloomFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // C major arpeggio: C5, E5, G5, C6, E6
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.12, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.3);
      });
    } catch {
      // Fallback
    }
  }

  // Play Grand Final Celebration Fanfare
  public playClimaxFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);

        gain.gain.setValueAtTime(0.15, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.5);
      });
    } catch {
      // Fallback
    }
  }

  // Lofi Music Box loop player
  public startLofiMusic() {
    if (this.musicInterval) return;
    this.initCtx();

    // Sweet pentatonic lofi notes (C4, E4, G4, A4, C5, D5, E5, G5)
    const melody = [
      523.25, 659.25, 783.99, 659.25,
      880.00, 783.99, 659.25, 523.25,
      587.33, 659.25, 783.99, 1046.50,
      880.00, 783.99, 659.25, 523.25
    ];

    this.musicInterval = window.setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      try {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        const now = this.ctx.currentTime;
        const freq = melody[this.musicNoteIndex % melody.length];
        this.musicNoteIndex++;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Music box soft attack & decay
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.65);
      } catch {
        // Fallback
      }
    }, 450);
  }

  public stopLofiMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopLofiMusic();
    } else {
      this.startLofiMusic();
    }
    return this.isMuted;
  }
}

export const soundFx = new SoundManager();
