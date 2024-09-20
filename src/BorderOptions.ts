/**
 * Options for how a border sohuld be rendered.
 */
export class BorderOptions {
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

  /**
   * Gets the color of the border.
   * @returns the color of the border.
   */
  get color() {
    return this.#color;
  }

  /**
   * Gets the width of the border.
   * @returns the width of the border.
   */
  get width() {
    return this.#width;
  }

  /**
   * Gets the radius of the border.
   * @returns the radius of the border.
   */
  get radius() {
    return this.#radius;
  }
}
