export default class Vector2D {
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  private set x(x: number) {
    this.#x = x;
  }

  private set y(y: number) {
    this.#y = y;
  }

  add(v: Vector2D) {
    return new Vector2D(this.#x + v.x, this.#y + v.y);
  }

  subtract(v: Vector2D) {
    return new Vector2D(this.#x - v.x, this.#y - v.y);
  }

  multiply(scalar: number) {
    return new Vector2D(this.#x * scalar, this.#y * scalar);
  }

  divide(scalar: number) {
    return new Vector2D(this.#x / scalar, this.#y / scalar);
  }

  magnitude() {
    return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
  }

  normalize() {
    return this.divide(this.magnitude());
  }

  dot(v: Vector2D) {
    return this.#x * v.x + this.#y * v.y;
  }

  angle(v: Vector2D) {
    return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()));
  }

  distance(v: Vector2D) {
    return this.subtract(v).magnitude();
  }
}
