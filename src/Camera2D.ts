import Vector2D from "./Vector2D";

export default class Camera2D {
  #position: Vector2D;
  width: number;
  height: number;

  constructor(position: Vector2D, width: number, height: number) {
    this.#position = position;
    this.width = width;
    this.height = height;
  }

  public get position() {
    return this.#position;
  }

  move(vector: Vector2D) {
    this.#position = this.position.add(vector);
  }

  centerOn(vector: Vector2D) {
    this.#position = vector.subtract(
      new Vector2D(this.width / 2, this.height / 2)
    );
  }
}
