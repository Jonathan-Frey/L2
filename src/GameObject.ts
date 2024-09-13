export default abstract class GameObject {
  // called each frame by the GameEngine Object
  update(delta: number, ctx: CanvasRenderingContext2D
  ) {
    this.process(delta);
    this.render(delta, ctx);
  }

  // For behavior and interaction.
  protected process(delta: number) {}

  // For rendering the object to the screen.
  protected render(delta: number, ctx: CanvasRenderingContext2D) {}
}
