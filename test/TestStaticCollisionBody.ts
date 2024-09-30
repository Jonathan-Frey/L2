import { StaticCollisionBody } from "../src/StaticCollisionBody";
import { CollisionLayers } from "../src/CollisionLayers";
import { CollisionShape } from "../src/CollisionShape";
import { Vector2D } from "../src/Vector2D";

export class TestStaticCollisionBody extends StaticCollisionBody {
  constructor(
    position: Vector2D,
    collisionShape: CollisionShape,
    collisionLayers: CollisionLayers = new CollisionLayers()
  ) {
    super(position, collisionShape, collisionLayers);
  }
}
