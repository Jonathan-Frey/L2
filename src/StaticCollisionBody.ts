import { CollisionBody } from "./CollisionBody";
import { CollisionShape } from "./CollisionShape";
import { Vector2D } from "./Vector2D";

export abstract class StaticCollisionBody extends CollisionBody {
  type = "StaticCollisionBody";
  constructor(position: Vector2D, collisionShape: CollisionShape) {
    super(position, collisionShape);
  }

  override onCollision(other: CollisionBody) {
    const intersectionVector = this.collisionShape.getIntersectionVector(
      other.collisionShape
    );
    if (other.type === "StaticCollisionBody") {
      this.position = this.position.add(intersectionVector.multiply(0.5));
    }
  }
}
