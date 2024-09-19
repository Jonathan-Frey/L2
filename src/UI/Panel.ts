import BorderOptions from "../BorderOptions";
import GameObject from "../GameObject";
import Vector2D from "../Vector2D";

export default class Panel extends GameObject {
  #width: number;
  #height: number;
  #color: string | CanvasGradient | CanvasPattern;
  #borderOptions: BorderOptions;

  constructor(
    width: number,
    height: number,
    color: string | CanvasGradient | CanvasPattern,
    borderOptions: BorderOptions,
    fixed: boolean = false,
    position: Vector2D = new Vector2D(0, 0)
  ) {
    super(fixed, position);
    this.#width = width;
    this.#height = height;
    this.#color = color;
    this.#borderOptions = borderOptions;
  }

  override render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.strokeStyle = this.#borderOptions.color;
    ctx.lineWidth = this.#borderOptions.width;
    ctx.beginPath();
    ctx.moveTo(
      this.globalPosition.x + this.#borderOptions.radius,
      this.globalPosition.y
    );
    ctx.lineTo(
      this.globalPosition.x + this.#width - this.#borderOptions.radius,
      this.globalPosition.y
    );
    ctx.quadraticCurveTo(
      this.globalPosition.x + this.#width,
      this.globalPosition.y,
      this.globalPosition.x + this.#width,
      this.globalPosition.y + this.#borderOptions.radius
    );
    ctx.lineTo(
      this.globalPosition.x + this.#width,
      this.globalPosition.y + this.#height - this.#borderOptions.radius
    );
    ctx.quadraticCurveTo(
      this.globalPosition.x + this.#width,
      this.globalPosition.y + this.#height,
      this.globalPosition.x + this.#width - this.#borderOptions.radius,
      this.globalPosition.y + this.#height
    );
    ctx.lineTo(
      this.globalPosition.x + this.#borderOptions.radius,
      this.globalPosition.y + this.#height
    );
    ctx.quadraticCurveTo(
      this.globalPosition.x,
      this.globalPosition.y + this.#height,
      this.globalPosition.x,
      this.globalPosition.y + this.#height - this.#borderOptions.radius
    );
    ctx.lineTo(
      this.globalPosition.x,
      this.globalPosition.y + this.#borderOptions.radius
    );
    ctx.quadraticCurveTo(
      this.globalPosition.x,
      this.globalPosition.y,
      this.globalPosition.x + this.#borderOptions.radius,
      this.globalPosition.y
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
