import {
  type ISourceOptions,
  OutMode,
} from '@tsparticles/engine';

export const heroOption: ISourceOptions = {
  autoPlay: true,
  background: {
    opacity: 0,
  },
  style: {
    height: '100vh',
  },
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  detectRetina: true,
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: 'push',
      },
      onHover: {
        enable: false,
        mode: 'repulse',
      },
      resize: {
        enable: false,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    move: {
      direction: 'left',
      enable: true,
      outModes: {
        default: OutMode.out,
      },
      random: true,
      speed: { min: 0.3, max: 0.8 },
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: { min: 0.3, max: 0.8 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
        mode: 'auto',
      },
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  pauseOnBlur: true,
};
