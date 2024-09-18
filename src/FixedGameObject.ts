import GameObject from "./GameObject";

export default class FixedGameObject extends GameObject {
  render(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, 100, 100);
    super.render(ctx);

    ctx.restore();
  }

  renderFixed(ctx: CanvasRenderingContext2D) {}
}
