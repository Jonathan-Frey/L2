export default abstract class GameObject extends EventTarget {
  #parent: GameObject | null = null;
  #children: GameObject[] = [];

  // called each frame by the GameEngine Object
  update(delta: number, ctx: CanvasRenderingContext2D
  ) {
    this.#children.forEach((child) => {
      child.update(delta, ctx);
    });
    this.process(delta);
    this.render(delta, ctx);
  }

  protected getParent() {
    return this.#parent;
  }

  protected setParent(parent: GameObject) {
    this.#parent = parent;
  }

  protected addChild(child: GameObject) {
    child.setParent(this);
    this.#children.push(child);
  }

  protected removeChild(child: GameObject) {
      this.#children.filter((c) => c !== child);
  }

  // For behavior and interaction.
  protected process(delta: number) {}

  // For rendering the object to the screen.
  protected render(delta: number, ctx: CanvasRenderingContext2D) {}
}
