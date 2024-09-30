import { TestCollisionBody } from "./TestCollisionBody";
import { TestStaticCollisionBody } from "./TestStaticCollisionBody";
import { CollisionLayers } from "../src/CollisionLayers";
import { RectangleCollisionShape } from "../src/RectangleCollisionShape";
import { Vector2D } from "../src/Vector2D";

test("CollisionBody constructor does not throw an error", () => {
  expect(() => {
    new TestCollisionBody(
      new Vector2D(0, 0),
      new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
      new CollisionLayers()
    );
  }).not.toThrow();
});

test("CollisionBody collisionShape getter returns collisionShape", () => {
  const collisionShape = new RectangleCollisionShape(
    new Vector2D(0, 0),
    10,
    10
  );
  const collisionBody = new TestCollisionBody(
    new Vector2D(0, 0),
    collisionShape,
    new CollisionLayers()
  );

  expect(collisionBody.collisionShape).toBe(collisionShape);
});

test("CollisionBody getCollisionLayers returns collisionLayers", () => {
  const collisionLayers = new CollisionLayers();
  const collisionBody = new TestCollisionBody(
    new Vector2D(0, 0),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    collisionLayers
  );

  expect(collisionBody.getCollisionLayers()).toBe(collisionLayers);
});

test("CollisionBody isCollidingWith returns true when colliding", () => {
  const collisionBody1 = new TestCollisionBody(
    new Vector2D(0, 0),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );
  const collisionBody2 = new TestCollisionBody(
    new Vector2D(5, 5),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );

  expect(collisionBody1.isCollidingWith(collisionBody2)).toBe(true);
});

test("CollisionBody isCollidingWith returns false when not colliding", () => {
  const collisionBody1 = new TestCollisionBody(
    new Vector2D(0, 0),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );
  const collisionBody2 = new TestCollisionBody(
    new Vector2D(20, 20),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );

  expect(collisionBody1.isCollidingWith(collisionBody2)).toBe(false);
});

test("CollisionBody onCollision handles collision with StaticCollisionBody", () => {
  const collisionBody1 = new TestCollisionBody(
    new Vector2D(0, 0),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );
  const collisionBody2 = new TestStaticCollisionBody(
    new Vector2D(5, 5),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );

  collisionBody1.onCollision(collisionBody2);

  expect(collisionBody1.position.x).toEqual(0);
  expect(collisionBody1.position.y).toEqual(-5);
});

test("CollisionBody onCollision handles collision with CollisionBody", () => {
  const collisionBody1 = new TestCollisionBody(
    new Vector2D(0, 0),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );
  const collisionBody2 = new TestCollisionBody(
    new Vector2D(5, 5),
    new RectangleCollisionShape(new Vector2D(0, 0), 10, 10),
    new CollisionLayers()
  );

  collisionBody1.onCollision(collisionBody2);

  expect(collisionBody1.position.x).toEqual(0);
  expect(collisionBody1.position.y).toEqual(-2.5);
});
