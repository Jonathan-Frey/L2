import { GameObject } from "../src/GameObject";
import { Vector2D } from "../src/Vector2D";

export class TestGameObject extends GameObject {
  constructor(position: Vector2D) {
    super(position);
  }
}
