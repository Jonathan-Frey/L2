import GameObject from "./GameObject";
import Vector2D from "./Vector2D";

export default class Hitbox {
  #parent: GameObject | null | undefined = null;
  #position: Vector2D;
  #width: number;
  #height: number;

  constructor(position: Vector2D, width: number, height: number) {
    this.#position = position;
    this.#width = width;
    this.#height = height;
  }

  getParent() {
    return this.#parent;
  }

  setParent(parent: GameObject) {
    this.#parent = parent;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  /**
   * Checks if this hitbox intersects with another hitbox.
   * @param other The other hitbox to check against.
   * @returns True if the hitboxes intersect, false otherwise.
   */
  intersects(other: Hitbox): boolean {
    return !(
      this.globalPosition.x > other.globalPosition.x + other.#width ||
      this.globalPosition.x + this.#width < other.globalPosition.x ||
      this.globalPosition.y > other.globalPosition.y + other.#height ||
      this.globalPosition.y + this.#height < other.globalPosition.y
    );
  }

  /**
   * Gets the global position of the GameObject.
   * @returns the global position of the GameObject.
   */
  get globalPosition(): Vector2D {
    return this.#parent?.globalPosition.add(this.#position) ?? this.#position;
  }
}
