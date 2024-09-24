export class CollisionLayers {
  #layers: Map<number, boolean> = new Map([
    [1, true],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
  ]);

  setLayer(value: number, enabled: boolean) {
    if (value < 1 || value > 5) {
      throw new Error("Invalid layer value. Must be between 1 and 5.");
    }
    this.#layers.set(value, enabled);
  }

  getActiveLayers() {
    const activeLayers: number[] = [];
    this.#layers.forEach((value, key) => {
      if (value) {
        activeLayers.push(key);
      }
    });
    return activeLayers;
  }

  overlaps(other: CollisionLayers) {
    const activeLayers = this.getActiveLayers();
    const otherActiveLayers = other.getActiveLayers();
    for (let i = 0; i < activeLayers.length; i++) {
      for (let j = 0; j < otherActiveLayers.length; j++) {
        if (activeLayers[i] === otherActiveLayers[j]) {
          return true;
        }
      }
    }
    return false;
  }
}
