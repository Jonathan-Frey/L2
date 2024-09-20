import { CollisionBody } from "./CollisionBody";
import { Vector2D } from "./Vector2D";

export abstract class CollisionShape {
  #parent: CollisionBody | null | undefined = null;
  #position: Vector2D;

  constructor(position: Vector2D) {
    this.#position = position;
  }

  setParent(parent: CollisionBody) {
    this.#parent = parent;
  }

  /**
   * Checks if this collision shape intersects with another collision shape.
   * @param other The other collision shape to check against.
   * @returns True if the shapes intersect, false otherwise.
   */
  abstract intersects(other: CollisionShape): boolean;

  abstract getIntersectionVector(other: CollisionShape): Vector2D;

  /**
   * Gets the global position of the GameObject.
   * @returns the global position of the GameObject.
   */
  get globalPosition(): Vector2D {
    return this.#parent?.globalPosition.add(this.#position) ?? this.#position;
  }
}
