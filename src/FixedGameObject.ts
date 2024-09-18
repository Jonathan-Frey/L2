import GameObject from "./GameObject";

/**
 * A fixed game object is a game object that is unaffected by the camera transformation.
 * @extends GameObject
 */
export default abstract class FixedGameObject extends GameObject {
  /**
   * Overrides the draw method of the GameObject class to ensure that the fixed game object is unaffected by the camera transformation.
   */
  override draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    super.draw(ctx);
    ctx.restore();
  }
}
