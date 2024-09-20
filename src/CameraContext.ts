import { Camera2D } from "./Camera2D";

/**
 * A singleton class that holds the current camera.
 *
 * This is used to allow game objects to access the camera without needing to pass it around.
 */
export class CameraContext {
  private static instance: CameraContext;
  private camera: Camera2D | null = null;

  private constructor() {}

  /**
   * Gets the instance of the CameraContext. If the instance does not exist, it creates it.
   * @returns the instance of the CameraContext.
   */
  static getInstance(): CameraContext {
    if (!CameraContext.instance) {
      CameraContext.instance = new CameraContext();
    }
    return CameraContext.instance;
  }

  /**
   * Sets the camera to be the current camera.
   * @param camera the camera to set as the current camera.
   */
  setCamera(camera: Camera2D) {
    this.camera = camera;
  }

  /**
   * Gets the current camera.
   * @returns the current camera.
   */
  getCamera(): Camera2D | null {
    return this.camera;
  }
}
