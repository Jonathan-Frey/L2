export abstract class GameObject {
  // called each frame by the GameEngine Object
  update(delta: number) {
    console.log("hello from game object");
    this.#process(delta);
    this.#render(delta);
  }

  // For behavior and interaction.
  #process(delta: number) {}

  // For rendering the object to the screen.
  #render(delta: number) {}
}
