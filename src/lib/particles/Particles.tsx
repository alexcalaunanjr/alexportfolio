'use client';

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  RecursivePartial,
  IOptions,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type ParticlesProps = {
  options: RecursivePartial<IOptions>;
  id: string;
};

export const ParticlesComponent = ({ options, id }: ParticlesProps) => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <Particles
        id={id}
        options={options}
      />
    );
  }

  return <></>;
};