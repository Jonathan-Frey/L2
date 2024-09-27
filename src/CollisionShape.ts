import { CollisionBody } from "./CollisionBody";
import { Vector2D } from "./Vector2D";

/**
 * Represents a collision shape that defines the shape of a CollisionBody.
 */
export abstract class CollisionShape {
  #parent: CollisionBody | null | undefined = null;
  #position: Vector2D;

  constructor(position: Vector2D) {
    this.#position = position;
  }

  /**
   * Sets the parent CollisionBody of this CollisionShape.
   * @returns void
   */
  setParent(parent: CollisionBody) {
    this.#parent = parent;
  }

  /**
   * Checks if this collision shape intersects with another collision shape.
   * @param other The other collision shape to check against.
   * @returns True if the shapes intersect, false otherwise.
   */
  abstract intersects(other: CollisionShape): boolean;

  /**
   * Gets the vector that represents the intersection of this collision shape with another collision shape.
   * @param other The other collision shape to check against.
   * @returns The vector that represents the intersection of the two shapes.
   */
  abstract getIntersectionVector(other: CollisionShape): Vector2D;

  /**
   * Gets the global position of the GameObject.
   * @returns the global position of the GameObject.
   */
  get globalPosition(): Vector2D {
    return this.#parent?.globalPosition.add(this.#position) ?? this.#position;
  }
}
