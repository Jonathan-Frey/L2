import { GameObject } from "../GameObject";
import { Vector2D } from "../Vector2D";

export class UiObject extends GameObject {
  #fixed: boolean;

  constructor(position: Vector2D, fixed: boolean) {
    super(position);
    this.#fixed = fixed;
  }

  override draw(ctx: CanvasRenderingContext2D) {
    if (this.#fixed) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    super.draw(ctx);
    if (this.#fixed) {
      ctx.restore();
    }
  }
}
