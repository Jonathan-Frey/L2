import { Camera } from "./Camera";
import { GameEngine } from "./GameEngine";

export class GameContext {
  static #instance: GameContext;

  #gameEngine: GameEngine | null = null;
  #activeCamera: Camera | null = null;

  private constructor() {}

  static getInstance() {
    if (!GameContext.#instance) {
      GameContext.#instance = new GameContext();
    }
    return GameContext.#instance;
  }

  setGameEngine(gameEngine: GameEngine) {
    this.#gameEngine = gameEngine;
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

  isActiveCamera(camera: Camera) {
    return this.#activeCamera === camera;
  }
}
