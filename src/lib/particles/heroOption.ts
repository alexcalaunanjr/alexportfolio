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
    height: '100%',
  },
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  detectRetina: true,
  fpsLimit: 100,
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
      speed: { min: 0.5, max: 1 },
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 200,
    },
    opacity: {
      value: { min: 0, max: 1 },
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
