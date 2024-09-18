import SceneNavigationEvent from "./SceneNavigationEvent";
import Vector2D from "./Vector2D";

export default abstract class GameObject extends EventTarget {
  #parent: GameObject | null | undefined = null;
  #children: GameObject[] = [];
  #position: Vector2D = new Vector2D(0, 0);

  constructor(position?: Vector2D) {
    super();
    if (position) {
      this.#position = position;
    }
  }

  getParent() {
    return this.#parent;
  }

  private setParent(parent: GameObject) {
    this.#parent = parent;
  }

  addChild(child: GameObject) {
    child.setParent(this);
    this.#children.push(child);
  }

  removeChild(child: GameObject) {
    this.#children.filter((c) => c !== child);
  }

  get position() {
    return this.#position;
  }

  set position(position: Vector2D) {
    const deltaX = position.x - this.#position.x;
    const deltaY = position.y - this.#position.y;

    this.#position = position;

    this.#children.forEach((child) => {
      const childPosition = child.position;
      child.position = new Vector2D(
        childPosition.x + deltaX,
        childPosition.y + deltaY
      );
    });
  }

  navigateTo(scene: GameObject) {
    this.dispatchEvent(new SceneNavigationEvent({ detail: { scene: scene } }));
  }

  // For behavior and interaction.
  update(delta: number) {
    this.process(delta);
    this.#children.forEach((child) => {
      child.update(delta);
    });
  }

  process(delta: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    this.render(ctx);
    this.#children.forEach((child) => {
      child.draw(ctx);
    });
  }

  // For rendering the object to the screen.
  render(ctx: CanvasRenderingContext2D) {}
}
