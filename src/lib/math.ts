import { Coords } from "./types";

export const dotsIntersect = (d1: Coords, d2: Coords, dotSize: number) =>
  Math.sqrt((d1.x - d2.x) ** 2 + (d1.y - d2.y) ** 2) <= dotSize + 4;

export const getCollisionTangent = (
  d1: Coords,
  d2: Coords,
  dotSize: number
) => {
  const dist = Math.sqrt((d1.x - d2.x) ** 2 + (d1.y - d2.y) ** 2);
  if (dist >= dotSize) return null;

  return [(d2.y - d1.y) / dist, -(d2.x - d1.x) / dist];
};

export const vecDotProduct = (v1: number[], v2: number[]) => {
  return v1[0] * v2[0] + v1[1] * v2[1];
};

export const createSpeedVecFromAngle = (a: number) => [
  Math.cos(a),
  Math.sin(a)
];
