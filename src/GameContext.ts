import { Camera } from "./Camera";
import { ClickData } from "./ClickData";
import { GameEngine } from "./GameEngine";
import { GameObject } from "./GameObject";
import { Vector2D } from "./Vector2D";

export class GameContext {
  static #instance: GameContext;

  #triggeredClick: ClickData | null = null;
  #gameEngine: GameEngine | null = null;
  #activeCamera: Camera | null = null;

  private constructor() {
    this.#addCanvasListeners();
  }

  static getInstance() {
    if (!GameContext.#instance) {
      GameContext.#instance = new GameContext();
    }
    return GameContext.#instance;
  }

  setGameEngine(gameEngine: GameEngine) {
    this.#gameEngine = gameEngine;
  }

  getCanvasCenter() {
    if (this.#gameEngine?.canvas) {
      return new Vector2D(
        this.#gameEngine.canvas.width / 2,
        this.#gameEngine.canvas.height / 2
      );
    } else {
      return null;
    }
  }

  getCanvasLeft() {
    if (this.#gameEngine?.canvas) {
      return this.#gameEngine.canvas.getBoundingClientRect().left;
    } else {
      return null;
    }
  }

  getCanvasTop() {
    if (this.#gameEngine?.canvas) {
      return this.#gameEngine.canvas.getBoundingClientRect().top;
    } else {
      return null;
    }
  }

  setActiveCamera(camera: Camera) {
    this.#activeCamera = camera;
  }

  getActiveCameraPosition() {
    if (this.#activeCamera) {
      return this.#activeCamera.globalPosition;
    }
    return null;
  }

  getCameraTransform() {
    const canvasCenter = this.getCanvasCenter();
    if (canvasCenter !== null) {
      return this.#activeCamera?.globalPosition
        .subtract(canvasCenter)
        .multiply(-1);
    }
    return null;
  }

  isActiveCamera(camera: Camera) {
    return this.#activeCamera === camera;
  }

  #addCanvasListeners() {
    this.#addClickListener();
  }

  #addClickListener() {
    document.addEventListener("click", (event) => {
      const clickPosition = this.#getClickPosition(event);
      if (clickPosition !== null) {
        const clickGlobalPosition = this.#getClickGlobalPosition(clickPosition);
        if (clickGlobalPosition !== null) {
          this.#triggeredClick = new ClickData(
            clickPosition,
            clickGlobalPosition
          );
        }
      }
    });
  }

  #getClickPosition(event: MouseEvent) {
    const canvasLeft = this.getCanvasLeft();
    const canvasTop = this.getCanvasTop();
    if (canvasLeft !== null && canvasTop !== null) {
      return new Vector2D(
        event.clientX - canvasLeft,
        event.clientY - canvasTop
      );
    }
    return null;
  }

  #getClickGlobalPosition(clickPosition: Vector2D) {
    const cameraTransform = this.getCameraTransform();
    if (cameraTransform) {
      return clickPosition.subtract(cameraTransform);
    }
    return null;
  }

  isMouseClicked() {
    if (this.#triggeredClick) {
      return true;
    }
  }

  getClickData() {
    return this.#triggeredClick;
  }

  clearClickData() {
    this.#triggeredClick = null;
  }

  navigateToScene(scene: GameObject) {
    this.#gameEngine?.navigateToScene(scene);
  }
}
