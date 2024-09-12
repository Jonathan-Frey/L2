import GameObject from "./GameObject";

export default class GameEngine {
  // The canvas element in which the game runs.
  #canvas: HTMLCanvasElement;

  // The 2d rendering contect of the canvas element in which the game runs.
  #ctx: CanvasRenderingContext2D;

  //
  #startTime: number | null = null;
  #lastFrameTime: number | null = null;
  #gameObjects: GameObject[] = [];
  #frame: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  // begins the game loop.
  start() {
    requestAnimationFrame((t) => this.#firstFrame(t));
  }

  #firstFrame(timeStamp: number) {
    this.#startTime = timeStamp;
    this.#lastFrameTime = timeStamp;
    this.#render(timeStamp);
  }

  // TODO: implement stopping the game, breaking the render loop and stop requesting frames.
  stop() {}

  #render(timeStamp: number) {
    const delta = this.#lastFrameTime ? timeStamp - this.#lastFrameTime : 0;
    this.#frame += 1;
    console.log("frame: ", this.#frame);
    console.log("delta: ", delta);
    this.#gameObjects.forEach((gameObject) => {
      gameObject.update(delta);
    });
    this.#lastFrameTime = timeStamp;
    requestAnimationFrame((t) => this.#render(t));
  }
}
