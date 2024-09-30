import { CollisionBody } from "./CollisionBody";
import { CollisionLayers } from "./CollisionLayers";
import { CollisionShape } from "./CollisionShape";
import { Vector2D } from "./Vector2D";

export class Area extends CollisionBody {
  type: string = "Area";
  #collidingBodies: CollisionBody[] = [];
  constructor(
    position: Vector2D,
    collisionShape: CollisionShape,
    collisionLayers: CollisionLayers = new CollisionLayers()
  ) {
    super(position, collisionShape, collisionLayers);
  }

  #addCollidingBody(other: CollisionBody) {
    this.#collidingBodies.push(other);
  }

  getCollidingBodies() {
    return this.#collidingBodies;
  }

  #clearCollidingBodies() {
    this.#collidingBodies = [];
  }

  override onCollision(other: CollisionBody) {
    this.#addCollidingBody(other);
  }

  override update(delta: number) {
    super.update(delta);
    this.#clearCollidingBodies();
  }
}
