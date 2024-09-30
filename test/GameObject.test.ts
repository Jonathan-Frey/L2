import { TestGameObject } from "./TestGameObject";
import { GameObject } from "../src/GameObject";
import { Vector2D } from "../src/Vector2D";

test("TestGameObject constructor does not throw an error", () => {
  expect(() => {
    new TestGameObject(new Vector2D(0, 0));
  }).not.toThrow();
});

test("GameObject position getter returns position", () => {
  const position = new Vector2D(0, 0);
  const gameObject = new TestGameObject(position);

  expect(gameObject.position).toBe(position);
});

test("GameObject position setter sets position", () => {
  const gameObject = new TestGameObject(new Vector2D(0, 0));
  const position = new Vector2D(5, 5);
  gameObject.position = position;

  expect(gameObject.position).toBe(position);
});

test("GameObject getParent returns parent", () => {
  const parent = new TestGameObject(new Vector2D(0, 0));
  const gameObject = new TestGameObject(new Vector2D(0, 0));
  parent.addChild(gameObject);

  expect(gameObject.getParent()).toBe(parent);
});

test("GameObject addChild adds child", () => {
  const parent = new TestGameObject(new Vector2D(0, 0));
  const child = new TestGameObject(new Vector2D(0, 0));
  parent.addChild(child);

  expect(parent.getAllChildren()).toContain(child);
});

test("GameObject removeChild removes child", () => {
  const parent = new TestGameObject(new Vector2D(0, 0));
  const child = new TestGameObject(new Vector2D(0, 0));
  parent.addChild(child);
  parent.removeChild(child);

  expect(parent.getAllChildren()).not.toContain(child);
});

test("GameObject getAllChildren returns all children", () => {
  const parent = new TestGameObject(new Vector2D(0, 0));
  const child1 = new TestGameObject(new Vector2D(0, 0));
  const child2 = new TestGameObject(new Vector2D(0, 0));
  parent.addChild(child1);
  child1.addChild(child2);

  expect(parent.getAllChildren()).toContain(child1);
  expect(parent.getAllChildren()).toContain(child2);
});

test("GameObject globalPosition getter returns global position", () => {
  const parent = new TestGameObject(new Vector2D(10, 0));
  const child = new TestGameObject(new Vector2D(15, 5));
  parent.addChild(child);

  expect(child.globalPosition.x).toEqual(25);
  expect(child.globalPosition.y).toEqual(5);
});

test("GameObject globalPosition getter returns position when there is no parent", () => {
  const gameObject = new TestGameObject(new Vector2D(0, 0));

  expect(gameObject.globalPosition.x).toEqual(0);
  expect(gameObject.globalPosition.y).toEqual(0);
});

test("GameObject remove removes GameObject from parent", () => {
  const parent = new TestGameObject(new Vector2D(0, 0));
  const child = new TestGameObject(new Vector2D(0, 0));
  parent.addChild(child);
  child.remove();

  expect(parent.getAllChildren).not.toContain(child);
});
