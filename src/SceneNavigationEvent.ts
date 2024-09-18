import GameObject from "./GameObject";

/**
 * The detail interface for the SceneNavigationEvent.
 */
interface SceneNavigationDetail {
  scene: GameObject;
}

/**
 * The init interface for the SceneNavigationEvent.
 */
interface SceneNavigationEventInit<T> extends EventInit {
  detail: SceneNavigationDetail;
}

/**
 * An event that is dispatched when a scene navigation occurs.
 */
export default class SceneNavigationEvent extends Event {
  readonly detail: SceneNavigationDetail;

  constructor(EventInitDict: SceneNavigationEventInit<SceneNavigationDetail>) {
    super("sceneNavigation", EventInitDict);
    this.detail = EventInitDict.detail;
  }
}
