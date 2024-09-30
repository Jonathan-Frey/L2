import { Camera } from "../src/Camera";
import { Vector2D } from "../src/Vector2D";

test("Camera constructor does not throw an error", () => {
  expect(() => {
    new Camera(new Vector2D(0, 0));
  }).not.toThrow();
});
