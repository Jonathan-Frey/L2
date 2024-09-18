export default class BorderOptions {
  #color: string | CanvasGradient | CanvasPattern;
  #width: number;
  #radius: number;

  constructor(
    color: string | CanvasGradient | CanvasPattern,
    width: number,
    radius: number
  ) {
    this.#color = color;
    this.#width = width;
    this.#radius = radius;
  }

  get color() {
    return this.#color;
  }

  get width() {
    return this.#width;
  }

  get radius() {
    return this.#radius;
  }
}
