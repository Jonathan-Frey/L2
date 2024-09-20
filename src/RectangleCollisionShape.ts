import { CollisionShape } from "./CollisionShape";
import { Vector2D } from "./Vector2D";

export class RectangleCollisionShape extends CollisionShape {
  #width: number;
  #height: number;

  constructor(position: Vector2D, width: number, height: number) {
    super(position);
    this.#width = width;
    this.#height = height;
  }

  override intersects(other: CollisionShape): boolean {
    if (other instanceof RectangleCollisionShape) {
      return !(
        this.globalPosition.x > other.globalPosition.x + other.#width ||
        this.globalPosition.x + this.#width < other.globalPosition.x ||
        this.globalPosition.y > other.globalPosition.y + other.#height ||
        this.globalPosition.y + this.#height < other.globalPosition.y
      );
    }
    return false;
  }

  override getIntersectionVector(other: CollisionShape): Vector2D {
    if (other instanceof RectangleCollisionShape) {
      const dx1 = this.globalPosition.x + this.#width - other.globalPosition.x;
      const dx2 = other.globalPosition.x + other.#width - this.globalPosition.x;
      const dy1 = this.globalPosition.y + this.#height - other.globalPosition.y;
      const dy2 =
        other.globalPosition.y + other.#height - this.globalPosition.y;

      const dx = Math.min(dx1, dx2);
      const dy = Math.min(dy1, dy2);

      if (dx < dy) {
        return new Vector2D(dx1 < dx2 ? -dx : dx, 0);
      } else {
        return new Vector2D(0, dy1 < dy2 ? -dy : dy);
      }
    }
    return new Vector2D(0, 0);
  }
}
