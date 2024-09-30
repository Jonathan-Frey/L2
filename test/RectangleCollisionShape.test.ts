import { RectangleCollisionShape } from "../src/RectangleCollisionShape";
import { Vector2D } from "../src/Vector2D";

test("RectangleCollisionShape constructor does not throw an error", () => {
  expect(() => {
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10);
  }).not.toThrow();
});

test("RectangleCollisionShape intersects with another RectangleCollisionShape", () => {
  const rect1 = new RectangleCollisionShape(new Vector2D(0, 0), 10, 10);
  const rect2 = new RectangleCollisionShape(new Vector2D(5, 5), 10, 10);
  const rect3 = new RectangleCollisionShape(new Vector2D(20, 20), 10, 10);

  expect(rect1.intersects(rect2)).toBe(true);
  expect(rect1.intersects(rect3)).toBe(false);
});

test("RectangleCollisionShape does not intersect with another RectangleCollisionShape", () => {
  const rect1 = new RectangleCollisionShape(new Vector2D(0, 0), 10, 10);
  const rect3 = new RectangleCollisionShape(new Vector2D(20, 20), 10, 10);

  expect(rect1.intersects(rect3)).toBe(false);
});

test("RectangleCollisionShape getIntersectionVector with another RectangleCollisionShape", () => {
  const rect1 = new RectangleCollisionShape(new Vector2D(0, 0), 10, 10);
  const rect2 = new RectangleCollisionShape(new Vector2D(5, 5), 10, 10);
  const rect3 = new RectangleCollisionShape(new Vector2D(20, 20), 10, 10);

  expect(rect1.getIntersectionVector(rect2)).toEqual(new Vector2D(-5, 0));
  expect(rect1.getIntersectionVector(rect3)).toEqual(new Vector2D(0, 0));
});

test("RectangleCollisionShape getIntersectionVector with another RectangleCollisionShape when intersecting", () => {
  const rect1 = new RectangleCollisionShape(new Vector2D(0, 0), 10, 10);
  const rect2 = new RectangleCollisionShape(new Vector2D(5, 5), 10, 10);
  const rect3 = new RectangleCollisionShape(new Vector2D(20, 20), 10, 10);

  expect(rect1.getIntersectionVector(rect2)).toEqual(new Vector2D(-5, 0));
  expect(rect1.getIntersectionVector(rect3)).toEqual(new Vector2D(0, 0));
});

test("RectangleCollisionShape getIntersectionVector with another RectangleCollisionShape when not intersecting", () => {
  const rect1 = new RectangleCollisionShape(new Vector2D(0, 0), 10, 10);
  const rect3 = new RectangleCollisionShape(new Vector2D(20, 20), 10, 10);

  expect(rect1.getIntersectionVector(rect3)).toEqual(new Vector2D(0, 0));
});
