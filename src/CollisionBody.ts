import { CollisionShape } from "./CollisionShape";
import { GameObject } from "./GameObject";
import { StaticCollisionBody } from "./StaticCollisionBody";
import { Vector2D } from "./Vector2D";

export abstract class CollisionBody extends GameObject {
  #collisionShape!: CollisionShape;
  type: string = "CollisionBody";

  constructor(position: Vector2D, collisionShape: CollisionShape) {
    super(position);
    this.setCollisionShape(collisionShape);
  }

  get collisionShape() {
    return this.#collisionShape;
  }

  private setCollisionShape(collisionShape: CollisionShape) {
    this.#collisionShape = collisionShape;
    this.#collisionShape.setParent(this);
  }

  isCollidingWith(other: CollisionBody) {
    return this.collisionShape.intersects(other.collisionShape);
  }

  onCollision(other: CollisionBody) {
    const intersectionVector = this.collisionShape.getIntersectionVector(
      other.collisionShape
    );
    if (other.type === "StaticCollisionBody") {
      this.position = this.position.add(intersectionVector);
    } else {
      this.position = this.position.add(intersectionVector.multiply(0.5));
    }
  }
}
