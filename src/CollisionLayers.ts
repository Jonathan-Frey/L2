/**
 * Manage collision layers. There are a total of 5 layers to work with.
 */
export class CollisionLayers {
  #layers: Map<number, boolean> = new Map([
    [1, true],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
  ]);

  /**
   * Set a layer to be enabled or disabled.
   * @param layer The layer to set.
   * @param enabled Whether the layer should be enabled or disabled.
   * @throws Error if the layer value is not between 1 and 5.
   */
  setLayer(layer: number, enabled: boolean) {
    if (layer < 1 || layer > 5) {
      throw new Error("Invalid layer value. Must be between 1 and 5.");
    }
    this.#layers.set(layer, enabled);
  }

  /**
   * Get the active layers.
   * @returns An array of the active layers
   */
  getActiveLayers() {
    const activeLayers: number[] = [];
    this.#layers.forEach((value, key) => {
      if (value) {
        activeLayers.push(key);
      }
    });
    return activeLayers;
  }

  /**
   * Check if this CollisionLayers overlaps with another CollisionLayers, meaning that they share at least one common layer.
   * @param other The other CollisionLayers to check against.
   * @returns True if the CollisionLayers overlap, false otherwise.
   */
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
