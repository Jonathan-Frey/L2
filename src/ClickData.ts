import { Vector2D } from "./Vector2D";

export class ClickData {
  #position: Vector2D;
  #globalPosition: Vector2D;

  constructor(position: Vector2D, globalPosition: Vector2D) {
    this.#position = position;
    this.#globalPosition = globalPosition;
  }

  get position() {
    return this.#position;
  }

  get globalPosition() {
    return this.#globalPosition;
  }
}
