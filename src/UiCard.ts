import BorderOptions from "./BorderOptions";
import FixedGameObject from "./FixedGameObject";
import Vector2D from "./Vector2D";

export default class UiCard extends FixedGameObject {
  #width: number;
  #height: number;
  #color: string | CanvasGradient | CanvasPattern;
  #borderOptions: BorderOptions;

  constructor(
    width: number,
    height: number,
    color: string | CanvasGradient | CanvasPattern,
    borderOptions: BorderOptions,
    position?: Vector2D
  ) {
    super(position);
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
    ctx.moveTo(this.position.x + this.#borderOptions.radius, this.position.y);
    ctx.lineTo(
      this.position.x + this.#width - this.#borderOptions.radius,
      this.position.y
    );
    ctx.quadraticCurveTo(
      this.position.x + this.#width,
      this.position.y,
      this.position.x + this.#width,
      this.position.y + this.#borderOptions.radius
    );
    ctx.lineTo(
      this.position.x + this.#width,
      this.position.y + this.#height - this.#borderOptions.radius
    );
    ctx.quadraticCurveTo(
      this.position.x + this.#width,
      this.position.y + this.#height,
      this.position.x + this.#width - this.#borderOptions.radius,
      this.position.y + this.#height
    );
    ctx.lineTo(
      this.position.x + this.#borderOptions.radius,
      this.position.y + this.#height
    );
    ctx.quadraticCurveTo(
      this.position.x,
      this.position.y + this.#height,
      this.position.x,
      this.position.y + this.#height - this.#borderOptions.radius
    );
    ctx.lineTo(this.position.x, this.position.y + this.#borderOptions.radius);
    ctx.quadraticCurveTo(
      this.position.x,
      this.position.y,
      this.position.x + this.#borderOptions.radius,
      this.position.y
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
