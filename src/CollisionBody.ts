import { CollisionShape } from "./CollisionShape";
import { GameObject } from "./GameObject";
import { Vector2D } from "./Vector2D";

/**
 * Represents a collision body that can collide with other collision bodies.
 */
export abstract class CollisionBody extends GameObject {
  #collisionShape!: CollisionShape;
  type: string = "CollisionBody";

  constructor(position: Vector2D, collisionShape: CollisionShape) {
    super(position);
    this.#setCollisionShape(collisionShape);
  }

  /**
   * Gets the collision shape of the CollisionBody.
   * @returns the collision shape of the CollisionBody.
   */
  get collisionShape() {
    return this.#collisionShape;
  }

  /**
   * Sets the collision shape of the CollisionBody.
   * @param collisionShape the collision shape to set.
   * @returns void
   */
  #setCollisionShape(collisionShape: CollisionShape) {
    this.#collisionShape = collisionShape;
    this.#collisionShape.setParent(this);
  }

  /**
   * Checks if this CollisionBody is colliding with another CollisionBody.
   * @param other The other CollisionBody to check against.
   * @returns True if the CollisionBodies are colliding, false otherwise.
   */
  isCollidingWith(other: CollisionBody) {
    return this.collisionShape.intersects(other.collisionShape);
  }

  /**
   * Handles the collision with another CollisionBody.
   * @param other The other CollisionBody to handle the collision with.
   * @returns void
   */
  onCollision(other: CollisionBody) {
    const intersectionVector = this.collisionShape.getIntersectionVector(
      other.collisionShape
    );
    if (other.type === "StaticCollisionBody") {
      this.position = this.position.add(intersectionVector);
    } else if (other.type === "CollisionBody") {
      this.position = this.position.add(intersectionVector.multiply(0.5));
    }
  }
}
