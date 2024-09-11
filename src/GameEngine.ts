export class GameEngine {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #startTime: number = 0;
  #lastFrameTime: number = 0;
  // #gameObjects: GameObject[] = [];
  #frame: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  start() {
    requestAnimationFrame((t) => this.#firstFrame(t));
  }

  #firstFrame(timeStamp: number) {
    this.#startTime = timeStamp;
    this.#lastFrameTime = timeStamp;
    this.#render(timeStamp);
  }

  stop() {}

  #render(timeStamp: number) {
    const delta = this.#lastFrameTime - timeStamp;
    this.#frame += 1;
    console.log("frame: ", this.#frame);
    console.log("delta: ", delta);
    // this.#gameObjects.forEach((gameObject) => {
    //   gameObject.render(delta);
    // });
    this.#lastFrameTime = timeStamp;
    requestAnimationFrame((t) => this.#render(t));
  }
}
