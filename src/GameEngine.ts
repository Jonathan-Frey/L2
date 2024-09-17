import GameObject from "./GameObject";
import SceneNavigationEvent from "./SceneNavigationEvent";

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
    if (options?.debug) {
      this.#debug = options.debug;
    } else {
      this.#debug = false;
    }
  }

  private setScene(scene: GameObject) {
    this.#scene = scene;
    this.#scene.addEventListener("sceneNavigation", (e) => {
      const event = e as SceneNavigationEvent;
      console.log(event.detail.scene);
      this.setScene(event.detail.scene);
    });
  }

  // begins the game loop.
  start() {
    window.requestAnimationFrame((t) => this.#firstFrame(t));
  }

  // the first frame of the game loop.
  #firstFrame(timeStamp: number) {
    this.#startTime = timeStamp;
    this.#lastFrameTime = timeStamp;
    this.#render(timeStamp);
  }

  // TODO: implement stopping the game, breaking the render loop and stop requesting frames.
  stop() {}

  // the main rendering ang logic loop of the game.
  #render(timeStamp: number) {
    // clear the canvas
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    // calculate the delta time
    const delta = this.#lastFrameTime ? timeStamp - this.#lastFrameTime : 0;

    // increment the frame counter
    this.#frame += 1;

    // update and render the active scene
    this.#scene.process(delta);
    this.#scene.render(delta, this.#ctx);

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
