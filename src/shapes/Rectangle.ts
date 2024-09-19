import GameObject from "../GameObject";
import Vector2D from "../Vector2D";

/**
 * A rectangle that can be rendered to a canvas.
 * @extends GameObject
 */
export default class Rectangle extends GameObject {
  #width: number;
  #height: number;
  #color: string | CanvasGradient | CanvasPattern;
  constructor(
    width: number,
    height: number,
    color: string | CanvasGradient | CanvasPattern,
    fixed: boolean = false,
    position?: Vector2D
  ) {
    super(fixed, position);
    this.#width = width;
    this.#height = height;
    this.#color = color;
  }

  override render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.#width,
      this.#height
    );
  }
}
