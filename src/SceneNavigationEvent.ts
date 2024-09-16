import GameObject from "./GameObject";

interface SceneNavigationDetail {
  scene: GameObject;
}

interface SceneNavigationEventInit<T> extends EventInit {
  detail: SceneNavigationDetail;
}

export default class SceneNavigationEvent extends Event {
  readonly detail: SceneNavigationDetail;

  constructor(EventInitDict: SceneNavigationEventInit<SceneNavigationDetail>) {
    super("sceneNavigation", EventInitDict);
    this.detail = EventInitDict.detail;
  }
}
