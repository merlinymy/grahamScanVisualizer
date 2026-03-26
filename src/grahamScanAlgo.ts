import { Point } from "./point";

function generateRandomPoints(numberOfPoints: number): Point[] {
  let points: Point[] = [];
  for (let i = 0; i < numberOfPoints; i++) {
    const x = Math.round(Math.random() * 10);
    const y = Math.round(Math.random() * 10);
    points.push(new Point(x, y));
  }
  return points;
}

function findPivot(points: Point[]): Point {
  let minY = Infinity;
  let pivot: Point = new Point(Infinity, Infinity);
  for (let point of points) {
    if (point.y < minY) {
      minY = point.y;
      pivot = point;
    } else if (pivot !== null && point.y === minY) {
      pivot = point.x < pivot.x ? point : pivot;
    }
  }
  return pivot;
}

function sortPointsByAngle(pivot: Point, points: Point[]): Point[] {
  return points.sort((a, b) => {
    const cp = compareAngle(pivot, a, b);
    if (cp !== 0) {
      return cp;
    } else {
      return compareDistance(pivot, a, b);
    }
  });
}
function compareDistance(p: Point, a: Point, b: Point): number {
  return (
    Math.abs(p.x - a.x) +
    Math.abs(p.y - a.y) -
    (Math.abs(p.x - b.x) + Math.abs(p.y - b.y))
  );
}
function compareAngle(p: Point, a: Point, b: Point): number {
  // a.x - p.x measures how far right A is to pivot
  // a.y - p.y measures how far up A is to pivot
  // b.x - p.x measures how far right B is to pivot
  // b.y - p.y measures how far up B is to pivot
  // (a.x - p.x, a.y - p.y) is the vector from pivot to A
  // (b.x - p.x, b.y - p.y) is the vector from pivot to B
  // (a.y - p.y) / (a.x - p.x) is the steepness of vector PA
  // (b.y - p.y) / (b.x - p.x) is the steepness of vector PB
  // we can't compare the steepness like this due to potentially divide by 0
  // so we compare them with cross multiplication
  // 3/7 vs 2/5 -> 3*5 vs 2*7 -> 15 > 14 -> 3/7 > 2/5
  // (a.y - p.y) * (b.x - p.x) vs (b.y - p.y) * (a.x - p.x)
  // angle A is bigger if (a.y - p.y) * (b.x - p.x) > (b.y - p.y) * (a.x - p.x)
  // if (a.y - p.y) * (b.x - p.x) - (b.y - p.y) * (a.x - p.x) > 0
  console.log(`comparing ${a.toString()} and ${b.toString()}`);
  console.log((a.y - p.y) * (b.x - p.x) - (b.y - p.y) * (a.x - p.x));
  return (a.y - p.y) * (b.x - p.x) - (b.y - p.y) * (a.x - p.x);
}

export function algo() {
  //   const points = generateRandomPoints(3);
  const points = [
    new Point(1, 3),
    new Point(5, 0),

    new Point(4, 0),
    new Point(3, 1),
    new Point(2, 2),
    new Point(4, 1),
  ];
  console.log(points);
  const pivot = findPivot(points);
  console.log(pivot);

  const filteredPoints = points.filter((ele: Point) => {
    return ele !== pivot;
  });
  sortPointsByAngle(pivot, filteredPoints);
  console.log(filteredPoints);
}

algo();
