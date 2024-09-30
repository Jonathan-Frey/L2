import { CollisionBody } from "../src/CollisionBody";
import { CollisionShape } from "../src/CollisionShape";
import { CollisionLayers } from "../src/CollisionLayers";
import { Vector2D } from "../src/Vector2D";

export class TestCollisionBody extends CollisionBody {
  constructor(
    position: Vector2D,
    collisionShape: CollisionShape,
    collisionLayers: CollisionLayers = new CollisionLayers()
  ) {
    super(position, collisionShape, collisionLayers);
  }
}
