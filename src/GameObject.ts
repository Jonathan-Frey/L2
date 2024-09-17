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

  protected getParent() {
    return this.#parent;
  }

  private setParent(parent: GameObject) {
    this.#parent = parent;
  }

  protected addChild(child: GameObject) {
    child.setParent(this);
    this.#children.push(child);
  }

  protected removeChild(child: GameObject) {
    this.#children.filter((c) => c !== child);
  }

  protected get position() {
    return this.#position;
  }

  protected set position(position: Vector2D) {
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

  protected navigateTo(scene: GameObject) {
    this.dispatchEvent(new SceneNavigationEvent({ detail: { scene: scene } }));
  }

  // For behavior and interaction.
  process(delta: number) {
    this.#children.forEach((child) => {
      child.process(delta);
    });
  }

  // For rendering the object to the screen.
  render(ctx: CanvasRenderingContext2D) {
    this.#children.forEach((child) => {
      child.render(ctx);
    });
  }
}
