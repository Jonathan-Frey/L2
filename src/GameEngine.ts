import GameObject from "./GameObject";
import SceneNavigationEvent from "./SceneNavigationEvent";
import Camera2D from "./Camera2D";
import Vector2D from "./Vector2D";
import CameraContext from "./CameraContext";

/**
 * The main game engine class.
 * Handles logic and rendering of the game. keeps track of the game objects and the camera.
 * @class
 */
export default class GameEngine {
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

  // the camera that is used to translate from world space to screen space.
  #camera: Camera2D;

  // the frame counter.
  #frame: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    scene: GameObject,
    options?: { debug?: boolean }
  ) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
    this.setScene(scene);
    this.#camera = new Camera2D(
      new Vector2D(0, 0),
      canvas.width,
      canvas.height
    );
    CameraContext.getInstance().setCamera(this.#camera);
    if (options?.debug) {
      this.#debug = options.debug;
    } else {
      this.#debug = false;
    }
  }

  /**
   * Sets the scene to be the active scene.
   * @param scene the scene to set as the active scene.
   */
  private setScene(scene: GameObject) {
    this.#scene = scene;
    this.#scene.addEventListener("sceneNavigation", (e) => {
      const event = e as SceneNavigationEvent;
      console.log(event.detail.scene);
      this.setScene(event.detail.scene);
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
    this.#render(timeStamp);
  }

  // TODO: implement stopping the game, breaking the render loop and stop requesting frames.
  stop() {}

  /**
   * The main render loop of the game.
   * @param timeStamp the time that the current frame started.
   */
  #render(timeStamp: number) {
    // clear the canvas
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    // calculate the delta time
    const delta = this.#lastFrameTime ? timeStamp - this.#lastFrameTime : 0;

    // increment the frame counter
    this.#frame += 1;

    // Apply camera transformation
    this.#ctx.save();
    this.#ctx.translate(-this.#camera.position.x, -this.#camera.position.y);

    // update and draw the active scene
    this.#scene.update(delta);
    this.#scene.draw(this.#ctx);

    // restore the canvas context
    this.#ctx.restore();

    // TODO: implement game objects unaffected by camera(UI, HUD, etc.)

    // render the frame counter if in debug mode
    if (this.#debug) {
      this.#ctx.fillText(`FPS: ${Math.round(1000 / delta)}`, 10, 10);
    }

    // update the last frame time
    this.#lastFrameTime = timeStamp;

    // request the next frame
    window.requestAnimationFrame((t) => this.#render(t));
  }
}
