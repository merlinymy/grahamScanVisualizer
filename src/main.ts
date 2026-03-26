import { canvasSetup } from "./canvasSetup";
import { Point } from "./point";
const numberOfPoints = 10;

function generateRandomPoints(numPoints: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < numPoints; i++) {
    const x = Math.round(Math.random() * 10);
    const y = Math.round(Math.random() * 10);
    points.push(new Point(x, y));
  }
  return points;
}

const canvas = canvasSetup();

const points = generateRandomPoints(numberOfPoints);

console.log("Generated Points:");
points.forEach((point, index) => {
  console.log(`Point ${index + 1}: ${point.toString()}`);
});
