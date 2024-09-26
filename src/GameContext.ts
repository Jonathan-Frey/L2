import { Camera } from "./Camera";
import { ClickData } from "./ClickData";
import { GameEngine } from "./GameEngine";
import { GameObject } from "./GameObject";
import { Vector2D } from "./Vector2D";

/**
 * A singleton that holds the context of the game.
 */
export class GameContext {
  static #instance: GameContext;

  #triggeredClick: ClickData | null = null;
  #gameEngine: GameEngine | null = null;
  #activeCamera: Camera | null = null;

  private constructor() {}

  /**
   * Gets the singleton instance of the GameContext.
   * @returns the singleton instance of the GameContext.
   * @static
   */
  static getInstance() {
    if (!GameContext.#instance) {
      GameContext.#instance = new GameContext();
    }
    return GameContext.#instance;
  }

  /**
   * Sets the game engine.
   * @param gameEngine The game engine to set.
   * @returns void
   */
  setGameEngine(gameEngine: GameEngine) {
    this.#gameEngine = gameEngine;
    this.#addCanvasListeners();
  }

  /**
   * Calculates the center of the canvas.
   * @returns the center of the canvas or null if either the canvas or the game engine is not set.
   */
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

  /**
   * Calculates the left position of the canvas.
   * @returns the left position of the canvas or null if either the canvas or the game engine is not set.
   */
  getCanvasLeft() {
    if (this.#gameEngine?.canvas) {
      return this.#gameEngine.canvas.getBoundingClientRect().left;
    } else {
      return null;
    }
  }

  /**
   * Calculates the top position of the canvas.
   * @returns the top position of the canvas or null if either the canvas or the game engine is not set.
   */
  getCanvasTop() {
    if (this.#gameEngine?.canvas) {
      return this.#gameEngine.canvas.getBoundingClientRect().top;
    } else {
      return null;
    }
  }

  /**
   * Sets the active camera.
   * @param camera The camera to set as active.
   * @returns void
   */
  setActiveCamera(camera: Camera) {
    this.#activeCamera = camera;
  }

  /**
   * Gets the active cameras position.
   * @returns the active cameras position or null if there is no active camera.
   */
  getActiveCameraPosition() {
    if (this.#activeCamera) {
      return this.#activeCamera.globalPosition;
    }
    return null;
  }

  /**
   * Gets the camera transformation.
   * @returns the camera transformation or null if there is no active camera.
   */
  getCameraTransform() {
    const canvasCenter = this.getCanvasCenter();
    if (canvasCenter !== null) {
      return this.#activeCamera?.globalPosition
        .subtract(canvasCenter)
        .multiply(-1);
    }
    return null;
  }

  /**
   * Checks if the given camera is the active camera.
   * @param camera The camera to check.
   * @returns True if the given camera is the active camera, false otherwise.
   */
  isActiveCamera(camera: Camera) {
    return this.#activeCamera === camera;
  }

  /**
   * Sets up the canvas listeners for user input.
   * @returns void
   */
  #addCanvasListeners() {
    this.#addClickListener();
  }

  /**
   * Adds a click listener to the canvas that stores the click data.
   * @returns void
   */
  #addClickListener() {
    this.#gameEngine?.canvas.addEventListener("click", (event) => {
      console.log("click");
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

  /**
   * Gets the position of the click event.
   * @param event The click event.
   * @returns the position of the click event or null if the canvas position cannot be calculated.
   */
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

  /**
   * Gets the global position of the click event.
   * @param clickPosition The position of the click event.
   * @returns the global position of the click event or null if the camera transformation cannot be calculated.
   */
  #getClickGlobalPosition(clickPosition: Vector2D) {
    const cameraTransform = this.getCameraTransform();
    if (cameraTransform) {
      return clickPosition.subtract(cameraTransform);
    }
    return null;
  }

  /**
   * Checks if the mouse is clicked.
   * @returns True if the mouse is clicked, false otherwise.
   */
  isMouseClicked() {
    if (this.#triggeredClick) {
      return true;
    }
  }

  /**
   * Gets the click data.
   * @returns the click data or null if the mouse is not clicked.
   */
  getClickData() {
    return this.#triggeredClick;
  }

  /**
   * Clears the click data.
   * @returns void
   */
  clearClickData() {
    this.#triggeredClick = null;
  }

  /**
   * Notifies the game engine to navigate to the given scene.
   * @param scene The scene to navigate to.
   * @returns void
   */
  navigateToScene(scene: GameObject) {
    this.#gameEngine?.navigateToScene(scene);
  }
}
