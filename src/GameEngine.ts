import { GameObject } from "./GameObject";
import { SceneNavigationEvent } from "./SceneNavigationEvent";
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

  #setupGameContext() {
    GameContext.getInstance().setGameEngine(this);
  }

  /**
   * Sets the scene to be the active scene.
   * @param scene the scene to set as the active scene.
   */
  #setScene(scene: GameObject) {
    this.#scene = scene;
    this.#setupNavigationListener();
  }

  #setupNavigationListener() {
    this.#scene.addEventListener("sceneNavigation", (e) => {
      const event = e as SceneNavigationEvent;
      this.#setScene(event.detail.scene);
    });
  }

  /**
   * Starts the game loop.
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
      this.#ctx.fillText(`FPS: ${Math.round(1000 / delta)}`, 10, 10);
    }

    // update the last frame time
    this.#lastFrameTime = timeStamp;

    // request the next frame
    window.requestAnimationFrame((t) => this.#gameLoop(t));
  }

  #clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  #calculateDelta(timeStamp: number) {
    return this.#lastFrameTime ? timeStamp - this.#lastFrameTime : 0;
  }

  #incrementFrame() {
    this.#frame += 1;
  }

  #update(delta: number) {
    this.#scene.update(delta);
  }

  /**
   * Checks for collisions between all game objects.
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

  #getAllCollisionBodyChildren() {
    return this.#scene
      .getAllChildren()
      .filter((obj) => obj instanceof CollisionBody);
  }

  #notifyCollisions(objA: CollisionBody, objB: CollisionBody) {
    objA.onCollision(objB);
    objB.onCollision(objA);
  }

  #getCanvasCenter() {
    return new Vector2D(
      this.#canvas.getBoundingClientRect().width / 2,
      this.#canvas.getBoundingClientRect().height / 2
    );
  }

  #applyCameraTransformation() {
    this.#ctx.save();
    const cameraPosition = GameContext.getInstance().getActiveCameraPosition();
    if (cameraPosition) {
      const cameraOffset = cameraPosition.subtract(this.#getCanvasCenter());
      this.#ctx.translate(-cameraOffset.x, -cameraOffset.y);
    }
  }

  #resetCameraTransformation() {
    this.#ctx.restore();
  }

  #draw() {
    this.#applyCameraTransformation();
    this.#scene.draw(this.#ctx);
    this.#resetCameraTransformation();
  }
}
