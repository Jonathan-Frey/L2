import Vector2D from "./Vector2D";

export default class Hitbox {
  position: Vector2D;
  width: number;
  height: number;

  constructor(position: Vector2D, width: number, height: number) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  /**
   * Checks if this hitbox intersects with another hitbox.
   * @param other The other hitbox to check against.
   * @returns True if the hitboxes intersect, false otherwise.
   */
  intersects(other: Hitbox): boolean {
    return !(
      this.position.x > other.position.x + other.width ||
      this.position.x + this.width < other.position.x ||
      this.position.y > other.position.y + other.height ||
      this.position.y + this.height < other.position.y
    );
  }
}
