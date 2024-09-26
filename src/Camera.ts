import { GameContext } from "./GameContext";
import { GameObject } from "./GameObject";
import { Vector2D } from "./Vector2D";

/**
 * A camera that can be used to move around a 2D game world.
 */
export class Camera extends GameObject {
  constructor(position: Vector2D) {
    super(position);
  }
}
