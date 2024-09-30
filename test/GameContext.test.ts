/* 
@jest-environment jsdom
*/

import { Camera } from "../src/Camera";
import { GameContext } from "../src/GameContext";
import { GameEngine } from "../src/GameEngine";
import { Vector2D } from "../src/Vector2D";
import { TestGameObject } from "./TestGameObject";

beforeEach(() => {
  GameContext.resetInstance();
});

test("GameContext getInstance returns the same instance", () => {
  const instance1 = GameContext.getInstance();
  const instance2 = GameContext.getInstance();
  expect(instance1).toBe(instance2);
});

test("GameContext setGameEngine does not throw", () => {
  const gameContext = GameContext.getInstance();
  const gameEngine = new GameEngine(
    document.createElement("canvas"),
    new TestGameObject(new Vector2D(0, 0))
  );
  expect(() => {
    gameContext.setGameEngine(gameEngine);
  }).not.toThrow();
});

test("GameContext getCanvasCenter returns the center of the canvas", () => {
  const gameContext = GameContext.getInstance();
  const gameEngine = new GameEngine(
    document.createElement("canvas"),
    new TestGameObject(new Vector2D(0, 0))
  );
  gameContext.setGameEngine(gameEngine);
  expect(gameContext.getCanvasCenter()).toEqual(new Vector2D(0, 0));
});

test("GameContext getCanvasLeft returns the left position of the canvas", () => {
  const gameContext = GameContext.getInstance();
  const gameEngine = new GameEngine(
    document.createElement("canvas"),
    new TestGameObject(new Vector2D(0, 0))
  );
  gameContext.setGameEngine(gameEngine);
  expect(gameContext.getCanvasLeft()).toBe(0);
});

test("GameContext getCanvasTop returns the top position of the canvas", () => {
  const gameContext = GameContext.getInstance();
  const gameEngine = new GameEngine(
    document.createElement("canvas"),
    new TestGameObject(new Vector2D(0, 0))
  );
  gameContext.setGameEngine(gameEngine);
  expect(gameContext.getCanvasTop()).toBe(0);
});

test("GameContext getCanvasCenter returns null if the canvas is not set", () => {
  const gameContext = GameContext.getInstance();
  expect(gameContext.getCanvasCenter()).toBeNull();
});

test("GameContext getCanvasLeft returns null if the canvas is not set", () => {
  const gameContext = GameContext.getInstance();
  expect(gameContext.getCanvasLeft()).toBeNull();
});

test("GameContext getCanvasTop returns null if the canvas is not set", () => {
  const gameContext = GameContext.getInstance();
  expect(gameContext.getCanvasTop()).toBeNull();
});

test("GameContext setActiveCamera does not throw", () => {
  const gameContext = GameContext.getInstance();
  const camera = new Camera(new Vector2D(0, 0));
  expect(() => {
    gameContext.setActiveCamera(camera);
  }).not.toThrow();
});

test("GameContext getActiveCameraPosition returns the position of the active camera", () => {
  const gameContext = GameContext.getInstance();
  const camera = new Camera(new Vector2D(10, 10));
  gameContext.setActiveCamera(camera);
  expect(gameContext.getActiveCameraPosition()).toEqual(new Vector2D(0, 0));
});

test("GameContext getActiveCameraPosition returns null if the active camera is not set", () => {
  const gameContext = GameContext.getInstance();
  expect(gameContext.getActiveCameraPosition()).toBeNull();
});

test("GameContext getCameraTransform returns the camera transform", () => {
  const gameContext = GameContext.getInstance();
  const gameObject = new TestGameObject(new Vector2D(10, 10));
  const camera = new Camera(new Vector2D(10, 10));
  gameObject.addChild(camera);
  gameContext.setActiveCamera(camera);
  const gameEngine = new GameEngine(
    document.createElement("canvas"),
    gameObject
  );
  gameContext.setGameEngine(gameEngine);
  expect(gameContext.getCameraTransform()).toEqual(new Vector2D(-20, -20));
});

test("GameContext getCameraTransform returns null if the camera is not set", () => {
  const gameContext = GameContext.getInstance();
  expect(gameContext.getCameraTransform()).toBeNull();
});

test("GameContext isActiveCamera returns true if the camera is active", () => {
  const gameContext = GameContext.getInstance();
  const camera = new Camera(new Vector2D(0, 0));
  gameContext.setActiveCamera(camera);
  expect(gameContext.isActiveCamera(camera)).toBe(true);
});

test("GameContext isActiveCamera returns false if another camera is active", () => {
  const gameContext = GameContext.getInstance();
  const camera = new Camera(new Vector2D(0, 0));
  gameContext.setActiveCamera(camera);
  const camera2 = new Camera(new Vector2D(0, 0));
  expect(gameContext.isActiveCamera(camera2)).toBe(false);
});

test("GameContext isActiveCamera returns false if no camera is active", () => {
  const gameContext = GameContext.getInstance();
  const camera = new Camera(new Vector2D(0, 0));
  expect(gameContext.isActiveCamera(camera)).toBe(false);
});
