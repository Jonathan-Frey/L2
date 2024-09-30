import { Vector2D } from "../src/Vector2D";

test("Vector2D constructor", () => {
  const v = new Vector2D(1, 2);
  expect(v.x).toBe(1);
  expect(v.y).toBe(2);
});

test("Vector2D add", () => {
  const v1 = new Vector2D(1, 2);
  const v2 = new Vector2D(3, 4);
  const v3 = v1.add(v2);
  expect(v3.x).toBe(4);
  expect(v3.y).toBe(6);
});

test("Vector2D subtract", () => {
  const v1 = new Vector2D(1, 2);
  const v2 = new Vector2D(3, 4);
  const v3 = v1.subtract(v2);
  expect(v3.x).toBe(-2);
  expect(v3.y).toBe(-2);
});

test("Vector2D multiply", () => {
  const v1 = new Vector2D(1, 2);
  const v2 = v1.multiply(2);
  expect(v2.x).toBe(2);
  expect(v2.y).toBe(4);
});

test("Vector2D divide", () => {
  const v1 = new Vector2D(2, 4);
  const v2 = v1.divide(2);
  expect(v2.x).toBe(1);
  expect(v2.y).toBe(2);
});

test("Vector2D magnitude", () => {
  const v = new Vector2D(3, 4);
  expect(v.magnitude()).toBe(5);
});

test("Vector2D normalize", () => {
  const v = new Vector2D(3, 4);
  const n = v.normalize();
  expect(n.x).toBeCloseTo(0.6);
  expect(n.y).toBeCloseTo(0.8);
});

test("Vector2D dot", () => {
  const v1 = new Vector2D(1, 2);
  const v2 = new Vector2D(3, 4);
  expect(v1.dot(v2)).toBe(11);
});

test("Vector2D angle", () => {
  const v1 = new Vector2D(1, 0);
  const v2 = new Vector2D(0, 1);
  expect(v1.angle(v2)).toBeCloseTo(Math.PI / 2);
});

test("Vector2D distance", () => {
  const v1 = new Vector2D(1, 2);
  const v2 = new Vector2D(4, 6);
  expect(v1.distance(v2)).toBeCloseTo(5);
});
