import { GameObject } from "./GameObject";
import { Vector2D } from "./Vector2D";
import { CollisionBody } from "./CollisionBody";
import { GameContext } from "./GameContext";

/**
 * The main game engine class.
 * Handles logic and rendering of the game. keeps track of the game objects and the camera.
 * @class
 */
export class GameEngine {
  // The canvas element in which the game runs.
  #canvas: HTMLCanvasElement;

  // The 2d rendering contect of the canvas element in which the game runs.
  #ctx: CanvasRenderingContext2D;

  // if the game is in debug mode. shows fps counter and other debug info.
  #debug: boolean;

  // the time that the game started.
  #startTime: number | null = null;

  // the time of the most recent frame.
  #lastFrameTime: number | null = null;

  // the game objects that are part of the game.
  #scene!: GameObject;

  // the frame counter.
  #frame: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    scene: GameObject,
    options?: { debug?: boolean }
  ) {
    // contructor initialization is not broken down into multiple methods
    // because typescript does not analyze the code to determine if the
    // required properties are initialized by methods called in the constructor.
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
    this.#setScene(scene);
    this.#setupGameContext();

    if (options?.debug) {
      this.#debug = options.debug;
    } else {
      this.#debug = false;
    }
  }

  /**
   * Sets up the game context singleton.
   * @returns void
   */
  #setupGameContext() {
    GameContext.getInstance().setGameEngine(this);
  }

  /**
   * Sets the scene to be the active scene.
   * @param scene the scene to set as the active scene.
   * returns void
   */
  #setScene(scene: GameObject) {
    if (this.#scene) {
      this.#scene.remove();
    }
    this.#scene = scene;
  }

  /**
   * Gets the canvas element in which the game runs.
   * @returns the canvas element in which the game runs.
   */
  get canvas() {
    return this.#canvas;
  }

  /**
   * Starts the game loop.
   * @returns void
   */
  start() {
    window.requestAnimationFrame((t) => this.#firstFrame(t));
  }

  /**
   * The first frame of the game loop.
   * @param timeStamp the time that the first frame started.
   */
  #firstFrame(timeStamp: number) {
    this.#startTime = timeStamp;
    this.#lastFrameTime = timeStamp;
    this.#gameLoop(timeStamp);
  }

  // TODO: implement stopping the game, breaking the render loop and stop requesting frames.
  stop() {}

  /**
   * The main render loop of the game.
   * @param timeStamp the time that the current frame started.
   */
  #gameLoop(timeStamp: number) {
    this.#clearCanvas();

    const delta = this.#calculateDelta(timeStamp);

    this.#incrementFrame();

    this.#update(delta);

    this.#checkCollisions();

    this.#draw();

    // render the frame counter if in debug mode
    if (this.#debug) {
      this.#ctx.fillStyle = "black";
      this.#ctx.fillText(`FPS: ${Math.round(1 / delta)}`, 10, 10);
    }

    GameContext.getInstance().clearInput();

    // update the last frame time
    this.#lastFrameTime = timeStamp;

    // request the next frame
    window.requestAnimationFrame((t) => this.#gameLoop(t));
  }

  /**
   * Clears the canvas.
   * @returns void
   */
  #clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  /**
   * Calculates the time since the last frame.
   * @param timeStamp the time that the current frame started.
   * @returns the time since the last frame.
   */
  #calculateDelta(timeStamp: number) {
    return this.#lastFrameTime ? (timeStamp - this.#lastFrameTime) / 1000 : 0;
  }

  /**
   * Increments the frame counter.
   * @returns void
   */
  #incrementFrame() {
    this.#frame += 1;
  }

  /**
   * Updates the scene and all of its children. For logical/process updates.
   * @param delta the time since the last frame.
   * @returns void
   */
  #update(delta: number) {
    this.#scene.update(delta);
  }

  /**
   * Checks for collisions between all game objects. and notifies the objects of the collisions.
   * @returns void
   */
  #checkCollisions() {
    const objects = this.#getAllCollisionBodyChildren();
    for (let i = 0; i < objects.length; i++) {
      for (let j = i + 1; j < objects.length; j++) {
        const objA = objects[i];
        const objB = objects[j];
        if (objA.isCollidingWith(objB)) {
          this.#notifyCollisions(objA, objB);
        }
      }
    }
  }

  /**
   * Gets all of the CollisionBody objects in the scene.
   * @returns all of the CollisionBody objects in the scene.
   */
  #getAllCollisionBodyChildren() {
    return this.#scene
      .getAllChildren()
      .filter((obj) => obj instanceof CollisionBody);
  }

  /**
   * Notifies the objects of the collision.
   * @param objA the first object in the collision.
   * @param objB the second object in the collision.
   * @returns void
   */
  #notifyCollisions(objA: CollisionBody, objB: CollisionBody) {
    objA.onCollision(objB);
    objB.onCollision(objA);
  }

  /**
   * Applies the camera transformation to the canvas.
   * @returns void
   */
  #applyCameraTransformation() {
    this.#ctx.save();
    const cameraPosition = GameContext.getInstance().getActiveCameraPosition();
    if (cameraPosition) {
      const cameraOffset = cameraPosition.subtract(
        GameContext.getInstance().getCanvasCenter()!
      );
      this.#ctx.translate(-cameraOffset.x, -cameraOffset.y);
    }
  }

  /**
   * Resets the camera transformation on the canvas.
   * @returns void
   */
  #resetCameraTransformation() {
    this.#ctx.restore();
  }

  /**
   * Draws the scene and all of its children. for rendering.
   * @returns void
   */
  #draw() {
    this.#applyCameraTransformation();
    this.#scene.draw(this.#ctx);
    this.#resetCameraTransformation();
  }

  /**
   * Navigates to a new scene.
   * @param scene the scene to navigate to.
   * @returns void
   */
  navigateToScene(scene: GameObject) {
    this.#setScene(scene);
  }
}
