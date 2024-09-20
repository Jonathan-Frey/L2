import { Vector2D } from "./Vector2D";

/**
 * A 2D camera that can be used to move around a 2D game world.
 */
export class Camera2D {
  #position: Vector2D;
  width: number;
  height: number;

  constructor(position: Vector2D, width: number, height: number) {
    this.#position = position;
    this.width = width;
    this.height = height;
  }

  /**
   * Gets the position of the camera.
   * @returns the position of the camera.
   */
  public get position() {
    return this.#position;
  }

  /**
   * moves the camera by a given vector.
   * @param position the vector to move the camera by.
   */
  move(vector: Vector2D) {
    this.#position = this.position.add(vector);
  }

  /**
   * Centers the camera on a given vector.
   * @param vector the vector to center the camera on.
   */
  centerOn(vector: Vector2D) {
    this.#position = vector.subtract(
      new Vector2D(this.width / 2, this.height / 2)
    );
  }
}
