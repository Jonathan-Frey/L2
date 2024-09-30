/*
@jest-environment jsdom
*/

import { TestGameObject } from "./TestGameObject";
import { GameEngine } from "../src/GameEngine";
import { Vector2D } from "../src/Vector2D";

test("GameEngine constructor does not throw an error", () => {
  const canvas = document.createElement("canvas");
  const scene = new TestGameObject(new Vector2D(0, 0));
  const gameEngine = new GameEngine(canvas, scene);
});

test("GameEngine start does not throw an error", () => {
  const canvas = document.createElement("canvas");
  const scene = new TestGameObject(new Vector2D(0, 0));
  const gameEngine = new GameEngine(canvas, scene);
  expect(() => {
    gameEngine.start();
  }).not.toThrow();
});

test("GameEngine stop does not throw an error", () => {
  const canvas = document.createElement("canvas");
  const scene = new TestGameObject(new Vector2D(0, 0));
  const gameEngine = new GameEngine(canvas, scene);
  expect(() => {
    gameEngine.stop();
  }).not.toThrow();
});

test("GameEngine navigateToScene does not throw an error", () => {
  const canvas = document.createElement("canvas");
  const scene = new TestGameObject(new Vector2D(0, 0));
  const gameEngine = new GameEngine(canvas, scene);
  expect(() => {
    gameEngine.navigateToScene(scene);
  }).not.toThrow();
});
