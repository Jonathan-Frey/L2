import { Vector2D } from "./Vector2D";

/**
 * Holds the data of a click event.
 */
export class ClickData {
  #position: Vector2D;
  #globalPosition: Vector2D;

  constructor(position: Vector2D, globalPosition: Vector2D) {
    this.#position = position;
    this.#globalPosition = globalPosition;
  }

  /**
   * Gets the position of the click event.
   * @returns the position of the click event.
   */
  get position() {
    return this.#position;
  }

  /**
   * Gets the global position of the click event.
   * @returns the global position of the click event.
   */
  get globalPosition() {
    return this.#globalPosition;
  }
}
