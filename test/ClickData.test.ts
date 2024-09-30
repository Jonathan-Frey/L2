import { ClickData } from "../src/ClickData";
import { Vector2D } from "../src/Vector2D";

describe("ClickData", () => {
  it("should store the position and global position", () => {
    const position = new Vector2D(1, 2);
    const globalPosition = new Vector2D(3, 4);
    const clickData = new ClickData(position, globalPosition);
    expect(clickData.position).toEqual(position);
    expect(clickData.globalPosition).toEqual(globalPosition);
  });
});
