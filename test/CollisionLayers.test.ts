import { CollisionLayers } from "../src/CollisionLayers";

test("CollisionLayers constructor does not throw an error", () => {
  expect(() => {
    new CollisionLayers();
  }).not.toThrow();
});

test("CollisionLayers getActiveLayers returns default layers", () => {
  const layers = new CollisionLayers();

  expect(layers.getActiveLayers()).toEqual([1]);
});

test("CollisionLayers setLayer set layers as true", () => {
  const layers = new CollisionLayers();
  layers.setLayer(1, true);
  layers.setLayer(2, true);
  layers.setLayer(3, true);
  layers.setLayer(4, true);
  layers.setLayer(5, true);

  expect(layers.getActiveLayers()).toEqual([1, 2, 3, 4, 5]);
});

test("CollisionLayers setLayer set layers as false", () => {
  const layers = new CollisionLayers();
  layers.setLayer(1, false);
  layers.setLayer(2, false);
  layers.setLayer(2, false);
  layers.setLayer(3, false);
  layers.setLayer(4, false);

  expect(layers.getActiveLayers()).toEqual([]);
});

test("CollisionLayers setLayer throws an error when layer is less than 1", () => {
  const layers = new CollisionLayers();
  expect(() => {
    layers.setLayer(0, true);
  }).toThrow();
});

test("CollisionLayers setLayer throws an error when layer is greater than 5", () => {
  const layers = new CollisionLayers();
  expect(() => {
    layers.setLayer(6, true);
  }).toThrow();
});

test("CollisionLayers overlaps", () => {
  const layers1 = new CollisionLayers();
  layers1.setLayer(1, true);
  layers1.setLayer(2, true);

  const layers2 = new CollisionLayers();
  layers2.setLayer(2, true);
  layers2.setLayer(3, true);

  expect(layers1.overlaps(layers2)).toBe(true);
});

test("CollisionLayers overlaps returns false when there are no overlapping layers", () => {
  const layers1 = new CollisionLayers();
  layers1.setLayer(1, true);
  layers1.setLayer(2, true);

  const layers2 = new CollisionLayers();
  layers2.setLayer(1, false);
  layers2.setLayer(3, true);
  layers2.setLayer(4, true);

  expect(layers1.overlaps(layers2)).toBe(false);
});
