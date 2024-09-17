import Camera2D from "./Camera2D";

export default class CameraContext {
  private static instance: CameraContext;
  private camera: Camera2D | null = null;

  private constructor() {}

  static getInstance(): CameraContext {
    if (!CameraContext.instance) {
      CameraContext.instance = new CameraContext();
    }
    return CameraContext.instance;
  }

  setCamera(camera: Camera2D) {
    this.camera = camera;
  }

  getCamera(): Camera2D | null {
    return this.camera;
  }
}
