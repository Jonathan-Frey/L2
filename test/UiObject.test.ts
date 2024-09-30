import { UiObject } from "../src/UI/UiObject";
import { Vector2D } from "../src/Vector2D";

test("UiObject constructor does not throw an error", () => {
  expect(() => {
    new UiObject(new Vector2D(0, 0), true);
  }).not.toThrow();
});
