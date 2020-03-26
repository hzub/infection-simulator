import {
  dotsIntersect,
  createSpeedVecFromAngle,
  getCollisionTangent,
  vecDotProduct
} from "./math";
import {
  InfectionState,
  Dot,
  SimulationEnvironment,
  SimulationConfig
} from "./types";
import { shuffleArray } from "./utils";

const generateDots = (
  environment: SimulationEnvironment,
  config: SimulationConfig
) => {
  const newDots: Dot[] = [];
  for (let i = 0; i < config.numberOfDots; i++) {
    let newX = 0;
    let newY = 0;
    do {
      newX =
        environment.dotSize / 2 +
        Math.random() * environment.canvasWidth -
        environment.dotSize;
      newY =
        environment.dotSize / 2 +
        Math.random() * environment.canvasHeight -
        environment.dotSize;
    } while (
      // eslint-disable-next-line no-loop-func
      newDots.some(existingDot =>
        dotsIntersect(existingDot, { x: newX, y: newY }, environment.dotSize)
      )
    );

    newDots.push({
      x: newX,
      y: newY,
      state: InfectionState.healthy,
      stationary: false,
      speedVec: createSpeedVecFromAngle(Math.random() * 2 * Math.PI)
    });
  }

  const stationaryShuffle = shuffleArray(newDots);
  for (
    let i = 0;
    i < (config.stationaryPercentAtStart / 100) * stationaryShuffle.length;
    i++
  ) {
    stationaryShuffle[i].stationary = true;
    stationaryShuffle[i].speedVec = [0, 0];
  }

  const infectedShuffle = shuffleArray(stationaryShuffle).sort((a, b) =>
    a.stationary && !b.stationary ? 1 : a.stationary && b.stationary ? 0 : -1
  );
  for (let i = 0; i < config.infectedDotsAtStart; i++) {
    infectedShuffle[i].state = InfectionState.infected;
  }

  return infectedShuffle;
};

export const createSimulation = (
  environment: SimulationEnvironment,
  config: SimulationConfig
) => {
  let peakInfected = 0;
  let peakInfectedPercent = 0;
  let numHealthy = 0;
  let numInfected = 0;
  let numCured = 0;
  let stopped = false;
  let started = false;
  let onUpdateFn: Function | undefined;
  const infectionHistory: [number, number][] = [];
  let lastTimeHistoryChanged = 0;

  const halfDotSize = environment.dotSize / 2;

  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvasElement.getContext("2d");

  canvasElement.width = environment.canvasWidth;
  canvasElement.height = environment.canvasHeight + environment.chartHeight;

  canvasElement.style.width = `${environment.canvasWidth / 2}px`;
  canvasElement.style.height = `${(environment.canvasHeight +
    environment.chartHeight) /
    2}px`;

  if (!context) {
    throw new Error("No context!");
  }

  let dots: Dot[] = [];

  dots = generateDots(environment, config);

  const think = (time: number) => {
    for (let i = 0; i < dots.length; i++) {
      const dotA = dots[i];

      if (dotA.state === InfectionState.infected && !dotA.infectionTime) {
        dotA.infectionTime = time;
      }

      if (
        dotA.infectionTime &&
        time - dotA.infectionTime > config.timeToCure * 1000
      ) {
        dotA.infectionTime = undefined;
        dotA.state = InfectionState.cured;
      }

      if (dotA.stationary) {
        continue;
      }
      dotA.x = dotA.x + dotA.speedVec[0] * environment.dotVelocity;
      dotA.y = dotA.y + dotA.speedVec[1] * environment.dotVelocity;

      if (dots[i].x < halfDotSize) {
        dots[i].x = halfDotSize;
        dots[i].speedVec[0] = -dots[i].speedVec[0];
      }

      if (dots[i].x > environment.canvasWidth - halfDotSize) {
        dots[i].x = environment.canvasWidth - halfDotSize;
        dots[i].speedVec[0] = -dots[i].speedVec[0];
      }

      if (dots[i].y < halfDotSize) {
        dots[i].y = halfDotSize;
        dots[i].speedVec[1] = -dots[i].speedVec[1];
      }

      if (dots[i].y > environment.canvasHeight - halfDotSize) {
        dots[i].y = environment.canvasHeight - halfDotSize;
        dots[i].speedVec[1] = -dots[i].speedVec[1];
      }

      for (let j = 0; j < dots.length; j++) {
        const dotB = dots[j];

        if (i === j) {
          continue;
        }

        const doCollide = getCollisionTangent(
          dots[i],
          dots[j],
          environment.dotSize
        );

        if (doCollide !== null) {
          if (
            dotA.state === InfectionState.infected &&
            dotB.state === InfectionState.healthy
          ) {
            dotB.state = InfectionState.infected;
          }
          if (
            dotB.state === InfectionState.infected &&
            dotA.state === InfectionState.healthy
          ) {
            dotA.state = InfectionState.infected;
          }

          if (!dotA.stationary) {
            dotA.x = dotA.x - dotA.speedVec[0] * environment.dotVelocity;
            dotA.y = dotA.y - dotA.speedVec[1] * environment.dotVelocity;
          }

          const dotAvelocityVector = dotA.speedVec;
          const dotBvelocityVector = dotB.speedVec;

          const relativeVelocity = [
            dotAvelocityVector[0] - dotBvelocityVector[0],
            dotAvelocityVector[1] - dotBvelocityVector[1]
          ];

          const len = vecDotProduct(relativeVelocity, doCollide);

          const velocityComponentOnTangent = [
            doCollide[0] * len,
            doCollide[1] * len
          ];

          const velocityComponentPerpendicularToTangent = [
            relativeVelocity[0] - velocityComponentOnTangent[0],
            relativeVelocity[1] - velocityComponentOnTangent[1]
          ];

          if (!dotA.stationary) {
            dotA.speedVec[0] =
              dotA.speedVec[0] -
              (dotB.stationary ? 2 : 1) *
                velocityComponentPerpendicularToTangent[0];
            dotA.speedVec[1] =
              dotA.speedVec[1] -
              (dotB.stationary ? 2 : 1) *
                velocityComponentPerpendicularToTangent[1];
            const dotAspeed = Math.sqrt(
              dotA.speedVec[0] ** 2 + dotA.speedVec[1] ** 2
            );
            dotA.speedVec[0] /= dotAspeed;
            dotA.speedVec[1] /= dotAspeed;
          }

          if (!dotB.stationary) {
            dotB.speedVec[0] =
              dotB.speedVec[0] +
              (dotA.stationary ? 2 : 1) *
                velocityComponentPerpendicularToTangent[0];
            dotB.speedVec[1] =
              dotB.speedVec[1] +
              (dotA.stationary ? 2 : 1) *
                velocityComponentPerpendicularToTangent[1];
            const dotBspeed = Math.sqrt(
              dotB.speedVec[0] ** 2 + dotB.speedVec[1] ** 2
            );

            dotB.speedVec[0] /= dotBspeed;
            dotB.speedVec[1] /= dotBspeed;
          }
        }
      }
    }
  };

  const render = (time: number) => {
    context.clearRect(
      0,
      0,
      environment.canvasWidth,
      environment.canvasHeight + environment.chartHeight
    );

    context.fillStyle = "rgba(0,0,0,0.025)";
    context.fillRect(
      0,
      environment.canvasHeight,
      environment.canvasWidth,
      environment.chartHeight
    );

    if (stopped) {
      return;
    }

    context.save();
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      context.fillStyle =
        dot.state === InfectionState.infected
          ? "orangered"
          : dot.state === InfectionState.cured
          ? "limegreen"
          : "#bbb";

      context.beginPath();

      context.arc(dot.x, dot.y, halfDotSize + 1, 0, 2 * Math.PI);

      context.fill();
    }

    context.font = "20px Source Sans Pro";

    context.fillStyle = "rgba(0,0,0,0.2)";
    context.fillRect(0, environment.canvasHeight, environment.canvasWidth, 1);

    context.fillStyle = "rgba(0,0,0,0.15)";
    context.fillRect(
      0,
      environment.canvasHeight + environment.chartHeight / 2,
      environment.canvasWidth,
      1
    );
    context.fillText(
      Math.round(dots.length / 2).toFixed(0),
      8,
      environment.canvasHeight + environment.chartHeight / 2 - 8
    );
    context.fillRect(
      0,
      environment.canvasHeight + environment.chartHeight / 4,
      environment.canvasWidth,
      1
    );
    context.fillText(
      Math.round(dots.length * 0.75).toFixed(0),
      8,
      environment.canvasHeight + environment.chartHeight / 4 - 8
    );

    context.fillRect(
      0,
      environment.canvasHeight + environment.chartHeight * 0.75,
      environment.canvasWidth,
      1
    );
    context.fillText(
      Math.round(dots.length * 0.25).toFixed(0),
      8,
      environment.canvasHeight + environment.chartHeight * 0.75 - 8
    );

    context.fillStyle = "rgba(0,0,0,0.4)";

    context.fillRect(
      0,
      environment.canvasHeight +
        ((100 - config.medicalCapacityPercent) / 100) * environment.chartHeight,
      environment.canvasWidth,
      1
    );

    context.fillText(
      "Supposed medical capacity",
      64,
      environment.canvasHeight +
        ((100 - config.medicalCapacityPercent) / 100) *
          environment.chartHeight -
        8
    );

    for (
      let i = 0;
      i <
      Math.min(
        infectionHistory.length,
        environment.canvasWidth / environment.chartBarWidth
      );
      i++
    ) {
      const x = environment.canvasWidth - (i + 1) * environment.chartBarWidth;
      const heightInfected =
        (infectionHistory[i][0] / dots.length) * environment.chartHeight;
      const heightCured =
        (infectionHistory[i][1] / dots.length) * environment.chartHeight;
      context.fillStyle = "rgba(255,0,0,0.3)";
      context.fillRect(
        x,
        environment.canvasHeight + environment.chartHeight - heightInfected,
        environment.chartBarWidth,
        heightInfected
      );

      context.fillStyle = "rgba(100,255,100,0.3)";
      context.fillRect(
        x,
        environment.canvasHeight + environment.chartHeight - heightCured,
        environment.chartBarWidth,
        heightCured
      );
    }

    context.restore();

    think(time);

    numHealthy = dots.filter(d => d.state === InfectionState.healthy).length;
    numInfected = dots.filter(d => d.state === InfectionState.infected).length;
    numCured = dots.filter(d => d.state === InfectionState.cured).length;

    if (time - lastTimeHistoryChanged > 50) {
      lastTimeHistoryChanged = time;
      infectionHistory.unshift([numInfected, numCured]);
    }

    if (numInfected > peakInfected) {
      peakInfected = numInfected;
    }

    peakInfectedPercent = (100 * peakInfected) / dots.length;

    onUpdateFn && onUpdateFn();
    window.requestAnimationFrame(render);
  };

  return {
    start: () => {
      if (started) return;
      started = true;
      window.requestAnimationFrame(render);
    },
    stop: () => {
      stopped = true;
    },
    onUpdate: (f: Function) => {
      onUpdateFn = f;
    },
    getState: () => ({
      numHealthy,
      numInfected,
      numCured,
      peakInfected,
      peakInfectedPercent
    })
  };
};
