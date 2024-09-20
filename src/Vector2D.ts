/**
 * A class representing a 2D vector.
 */
export class Vector2D {
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  /**
   * Gets the x component of the vector.
   * @returns the x component of the vector.
   */
  get x() {
    return this.#x;
  }

  /**
   * Gets the y component of the vector.
   * @returns the y component of the vector.
   */
  get y() {
    return this.#y;
  }

  /**
   * Sets the x component of the vector.
   */
  private set x(x: number) {
    this.#x = x;
  }

  /**
   * Sets the y component of the vector.
   */
  private set y(y: number) {
    this.#y = y;
  }

  /**
   * Adds a vector to this vector and returns the result.
   * @param v the vector to add.
   * @returns the result of adding the vector.
   */
  add(v: Vector2D) {
    return new Vector2D(this.#x + v.x, this.#y + v.y);
  }

  /**
   * Subtracts a vector from this vector and returns the result.
   * @param v the vector to subtract.
   * @returns the result of subtracting the vector.
   */
  subtract(v: Vector2D) {
    return new Vector2D(this.#x - v.x, this.#y - v.y);
  }

  /**
   * Multiplies the vector by a scalar and returns the result.
   * @param scalar the scalar to multiply the vector by.
   * @returns the result of multiplying the vector by the scalar.
   */
  multiply(scalar: number) {
    return new Vector2D(this.#x * scalar, this.#y * scalar);
  }

  /**
   * Divides the vector by a scalar and returns the result.
   * @param scalar the scalar to divide the vector by.
   * @returns the result of dividing the vector by the scalar.
   */
  divide(scalar: number) {
    return new Vector2D(this.#x / scalar, this.#y / scalar);
  }

  /**
   * Gets the magnitude of the vector.
   * @returns the magnitude of the vector.
   */
  magnitude() {
    return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
  }

  /**
   * Normalizes the vector and returns the result.
   * @returns the normalized vector.
   */
  normalize() {
    return this.divide(this.magnitude());
  }

  /**
   * Gets the dot product of this vector and another vector.
   * @param v the other vector.
   * @returns the dot product of the two vectors.
   */
  dot(v: Vector2D) {
    return this.#x * v.x + this.#y * v.y;
  }

  /**
   * Gets the angle between this vector and another vector.
   * @param v the other vector.
   * @returns the angle between the two vectors.
   */
  angle(v: Vector2D) {
    return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()));
  }

  /**
   * Gets the distance between this vector and another vector.
   * @param v the other vector.
   * @returns the distance between the two vectors.
   */
  distance(v: Vector2D) {
    return this.subtract(v).magnitude();
  }
}
