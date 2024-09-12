export default abstract class GameObject {
  // called each frame by the GameEngine Object
  update(delta: number) {
    console.log("hello from game object");
    this.process(delta);
    this.render(delta);
  }

  // For behavior and interaction.
  protected process(delta: number) {}

  // For rendering the object to the screen.
  protected render(delta: number) {}
}
