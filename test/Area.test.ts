import { Area } from "../src/Area";
import { CollisionLayers } from "../src/CollisionLayers";
import { RectangleCollisionShape } from "../src/RectangleCollisionShape";
import { Vector2D } from "../src/Vector2D";
import { TestCollisionBody } from "./TestCollisionBody";

test("Area constructor does not throw an error", () => {
  expect(() => {
    new Area(
      new Vector2D(0, 0),
      new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
      new CollisionLayers()
    );
  }).not.toThrow();
});

test("Area getCollidingBodies returns an empty array when no collisions have occured", () => {
  const area = new Area(
    new Vector2D(0, 0),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );

  expect(area.getCollidingBodies()).toEqual([]);
});

test("Area getCollidingBodies returns CollisionBodies that have collided with the Area", () => {
  const area = new Area(
    new Vector2D(0, 0),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );
  const collisionBody = new TestCollisionBody(
    new Vector2D(5, 5),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );

  area.onCollision(collisionBody);

  expect(area.getCollidingBodies()).toContain(collisionBody);
});
