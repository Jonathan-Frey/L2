import { SceneNavigationEvent } from "./SceneNavigationEvent";
import { Vector2D } from "./Vector2D";

/**
 * GameObject is the base class for all objects in the game.
 * It provides a basic structure for the game objects to be updated and rendered.
 *
 * - To affect the rendering of the GameObject, override the render method.
 * - To affect the behavior of the GameObject, override the process method.
 *
 * GameObjects can be added to other GameObjects as children.
 * When a GameObject is added as a child to another GameObject, its position will be updated when the parent GameObjects position is updated.
 * @extends EventTarget
 */
export abstract class GameObject extends EventTarget {
  #parent: GameObject | null | undefined = null;
  #children: GameObject[] = [];
  #position: Vector2D;

  constructor(position: Vector2D) {
    super();
    this.#position = position;
  }

  /**
   * @returns the parent GameObject of this GameObject.
   */
  getParent() {
    return this.#parent;
  }

  /**
   * @returns the children GameObjects of this GameObject.
   */
  private setParent(parent: GameObject) {
    this.#parent = parent;
  }

  /**
   * Adds a GameObject as a child to this GameObject.
   * @param child the GameObject to add as a child.
   * @returns void
   */
  addChild(child: GameObject): void {
    child.setParent(this);
    this.#children.push(child);
  }

  /**
   * Removes a GameObject from the children of this GameObject.
   * @param child the GameObject to remove from the children of this GameObject.
   * @returns void
   */
  removeChild(child: GameObject) {
    this.#children.filter((c) => c !== child);
  }

  getAllChildren(): GameObject[] {
    const allChildren = [...this.#children];
    this.#children.forEach((child) => {
      allChildren.push(...child.getAllChildren());
    });
    return allChildren;
  }

  /**
   * Gets the position of the GameObject.
   * @returns the position of the GameObject.
   */
  get position() {
    return this.#position;
  }
  /**
   * Gets the global position of the GameObject.
   * @returns the global position of the GameObject.
   */
  get globalPosition(): Vector2D {
    return this.#parent?.globalPosition.add(this.#position) ?? this.#position;
  }

  /**
   * Sets the position of the GameObject.
   * @param position the new position of the GameObject.
   */
  set position(position: Vector2D) {
    const deltaX = position.x - this.#position.x;
    const deltaY = position.y - this.#position.y;

    this.#position = position;
  }

  /**
   * Navigates to a new scene.
   * @param scene the scene to navigate to.
   */
  navigateTo(scene: GameObject) {
    this.dispatchEvent(new SceneNavigationEvent({ detail: { scene: scene } }));
  }

  /**
   * a wrapper for the process method that is called on the GameObject and all of its children by the game engine. DO NOT OVERRIDE!
   * @param delta the time since the last frame.
   * @returns void
   */
  update(delta: number) {
    this.process(delta);
    this.#children.forEach((child) => {
      child.update(delta);
    });
  }

  /**
   * The method to override to affect the behavior of the GameObject.
   * @param delta the time since the last frame.
   * @returns void
   */
  process(delta: number) {}

  /**
   * a wrapper for the render method that is called on the GameObject and all of its children by the game engine. DO NOT OVERRIDE!
   * @param ctx the canvas rendering context.
   * @returns void
   */
  draw(ctx: CanvasRenderingContext2D) {
    this.render(ctx);
    this.#children.forEach((child) => {
      child.draw(ctx);
    });
  }

  /**
   * The method to override to affect the rendering of the GameObject.
   * @param ctx the canvas rendering context.
   * @returns void
   */
  render(ctx: CanvasRenderingContext2D) {}
}
