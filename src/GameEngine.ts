import GameObject from "./GameObject";
import SceneNavigationEvent from "./SceneNavigationEvent";

export default class GameEngine {
  // The canvas element in which the game runs.
  #canvas: HTMLCanvasElement;

  // The 2d rendering contect of the canvas element in which the game runs.
  #ctx: CanvasRenderingContext2D;

  // the time that the game started.
  #startTime: number | null = null;

  // the time of the most recent frame.
  #lastFrameTime: number | null = null;

  // the game objects that are part of the game.
  #scene!: GameObject;

  // the frame counter.
  #frame: number = 0;

  constructor(canvas: HTMLCanvasElement, scene: GameObject) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
    this.setScene(scene);
  }

  setScene(scene: GameObject) {
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
    this.#scene.update(delta, this.#ctx);

    // update the last frame time
    this.#lastFrameTime = timeStamp;

    // request the next frame
    window.requestAnimationFrame((t) => this.#render(t));
  }
}
