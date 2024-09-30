import { Panel } from "../src/UI/Panel";
import { Vector2D } from "../src/Vector2D";
import { BorderOptions } from "../src/BorderOptions";

test("Panel constructor does not throw an error", () => {
  expect(() => {
    new Panel(
      new Vector2D(0, 0),
      true,
      10,
      10,
      "green",
      new BorderOptions("red", 2, 2)
    );
  }).not.toThrow();
});
