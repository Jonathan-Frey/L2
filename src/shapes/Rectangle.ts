import GameObject from "../GameObject";
import Vector2D from "../Vector2D";

export default class Rectangle extends GameObject {
  #width: number;
  #height: number;
  #color: string | CanvasGradient | CanvasPattern;
  constructor(
    width: number,
    height: number,
    color: string | CanvasGradient | CanvasPattern,
    position?: Vector2D
  ) {
    super(position);
    this.#width = width;
    this.#height = height;
    this.#color = color;
  }

  override render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(this.position.x, this.position.y, this.#width, this.#height);
  }
}
