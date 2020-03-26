export enum InfectionState {
  "healthy",
  "infected",
  "cured"
}

export type SimulationState = {
  numHealthy: number;
  numInfected: number;
  numCured: number;
  peakInfected: number;
  peakInfectedPercent: number;
};

export type Simulation = {
  start: () => void;
  stop: () => void;
  onUpdate: (f: Function) => void;
  getState: () => SimulationState;
};

export interface SimulationEnvironment {
  dotSize: number;
  dotVelocity: number;
  canvasWidth: number;
  canvasHeight: number;
  chartHeight: number;
  chartBarWidth: number;
}

export interface SimulationConfig {
  numberOfDots: number;
  stationaryPercentAtStart: number;
  infectedDotsAtStart: number;
  timeToCure: number;
  medicalCapacityPercent: number;
}

export type Dot = {
  x: number;
  y: number;
  state: InfectionState;
  stationary?: boolean;
  speedVec: number[];
  infectionTime?: number;
};

export type Coords = {
  x: number;
  y: number;
};
