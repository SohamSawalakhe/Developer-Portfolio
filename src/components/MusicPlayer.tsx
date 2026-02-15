import { useState, useRef, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  // Generate a soft ambient pad programmatically so we don't depend on external URLs
  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const sampleRate = ctx.sampleRate;
    const duration = 16; // 16-second loop
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      // Combine multiple sine waves for a rich ambient pad
      const freqs = [130.81, 164.81, 196.00, 261.63, 329.63]; // C3 chord
      const channelOffset = channel * 0.3;

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        let sample = 0;

        for (let f = 0; f < freqs.length; f++) {
          const freq = freqs[f];
          const vol = 0.08 / (f + 1);
          // Slight detune per channel for stereo width
          const detune = 1 + (channelOffset + f * 0.002) * 0.01;
          sample += Math.sin(2 * Math.PI * freq * detune * t) * vol;
          // Add harmonic
          sample += Math.sin(2 * Math.PI * freq * detune * 2 * t) * vol * 0.15;
        }

        // Slow LFO modulation for movement
        const lfo = 0.7 + 0.3 * Math.sin(2 * Math.PI * 0.08 * t);
        sample *= lfo;

        // Fade in/out for seamless loop
        const fadeLen = sampleRate * 2;
        if (i < fadeLen) {
          sample *= i / fadeLen;
        } else if (i > length - fadeLen) {
          sample *= (length - i) / fadeLen;
        }

        data[i] = sample * 0.5;
      }
    }

    bufferRef.current = buffer;

    const gain = ctx.createGain();
    gain.gain.value = 0.3;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    setLoaded(true);

    return () => {
      sourceRef.current?.stop();
      ctx.close();
    };
  }, []);

  const togglePlay = () => {
    const ctx = audioCtxRef.current;
    const buffer = bufferRef.current;
    const gain = gainRef.current;
    if (!ctx || !buffer || !gain) return;

    if (playing) {
      sourceRef.current?.stop();
      sourceRef.current = null;
      setPlaying(false);
    } else {
      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      source.start();
      sourceRef.current = source;
      setPlaying(true);
    }
  };

  return (
    <button
      className={`music-player ${playing ? 'playing' : ''} ${loaded ? 'loaded' : ''}`}
      onClick={togglePlay}
      aria-label={playing ? 'Mute music' : 'Play music'}
      title={playing ? 'Mute ambient music' : 'Play ambient music'}
    >
      <div className="music-icon">
        {playing ? <FaVolumeUp /> : <FaVolumeMute />}
      </div>
      <div className="music-visualizer">
        {[1, 2, 3, 4].map(i => (
          <span key={i} className={`bar bar-${i}`} />
        ))}
      </div>
    </button>
  );
}
