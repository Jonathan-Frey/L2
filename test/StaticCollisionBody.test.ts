import { TestCollisionBody } from "./TestCollisionBody";
import { TestStaticCollisionBody } from "./TestStaticCollisionBody";
import { CollisionLayers } from "../src/CollisionLayers";
import { RectangleCollisionShape } from "../src/RectangleCollisionShape";
import { Vector2D } from "../src/Vector2D";

test("StaticCollisionBody onCollision handles collision with StaticCollisionBody", () => {
  const collisionBody1 = new TestStaticCollisionBody(
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
  expect(collisionBody1.position.y).toEqual(-2.5);
});

test("StaticCollisionBody onCollision handles collision with CollisionBody", () => {
  const collisionBody1 = new TestStaticCollisionBody(
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
  expect(collisionBody1.position.y).toEqual(0);
});
