import { BorderOptions } from "../src/BorderOptions";

describe("BorderOptions", () => {
  it("should store the border options", () => {
    const color = "red";
    const width = 5;
    const radius = 10;
    const borderOptions = new BorderOptions(color, width, radius);
    expect(borderOptions.color).toEqual(color);
    expect(borderOptions.width).toEqual(width);
    expect(borderOptions.radius).toEqual(radius);
  });
});
