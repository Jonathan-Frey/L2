# Canvas Game Engine

A module for creating simple 2D games using object oriented programming. Utilizes the HTML Canvas API for rendering.

Made for the in 2024 as a part of the course 1dv610 at Linnaeus University.

## Table of Contents

- Usage
  - [Setting up](#setting-up)
- [Class Definition](#class-definition)
  - [GameEngine](#gameengine)
  - [GameContext](#gamecontext)
  - [GameObject](#gameobject)
  - [Vector2D](#vector2d)
  - [CollisionBody](#collisionbody)
  - [StaticCollisionBody](#staticcollisionbody)
  - [CollisionShape](#collisionshape)
  - [RectangleCollisionShape](#rectanglecollisionshape)
  - [Area](#area)
  - [CollisionLayers](#collisionlayers)
  - [Camera](#camera)
  - [ClickData](#clickdata)
  - [UiObject](#uiobject)
  - [Panel](#panel)
  - [BorderOptions](#borderoptions)

## Usage

### Setting up

The game engine needs access to a canvas element on the screen for rendering. It also needs to be passed an object that extends the GameObject class. This will function as the starting scene or level.

A scene also has to have at least one gameObject with a camera as a child in order for the rendering to work. properly.

Below is a simple example of a game where you have a box, and a player that can move using the WASD keys. Since the player inherits from CollisionBody, and the box inherits from StaticCollisionBody, they can collide with one another, preventing the player from passing through the box.

```typescript
// index.ts

import { Level1 } from "./scenes/Level1";
import { GameEngine } from "jf-canvas-game-engine";

const canvas = document.querySelector("canvas") as CanvasHtmlElement;

// The scene for the first level.
const level1 = new Level1();

const gameEngine = new GameEngine(canvas, level1);

gameEngine.start();
```

```typescript
// src/scenes/Level1.ts

import { GameObject, Vector2D } from "jf-canvas-game-engine";
import Player from "../gameObjects/Player";
import Box from "../gameObjects/Box";

export class Level1 extends GameObject {
  constructor() {
    super(new Vector2D(0, 0));

    // Add a cat to the scene
    const player = new Player(new Vector2D(100, 100), "Jonathan", "orange");
    this.addChild(player);

    // Add a box to the scene
    const box = new Box(new Vector2D(200, 200), 50, 50, "green");
    this.addChild(box);
  }
}
```

```typescript
// src/gameObjects/Player.ts
import {
  GameContext,
  CollisionBody,
  RectangleCollisionShape,
  Vector2D,
  Camera,
} from "jf-canvas-game-engine";
import { Bullet } from "./Bullet";

export default class Player extends CollisionBody {
  #name: string;
  #color: string | CanvasPattern | CanvasGradient;
  #width: number = 50;
  #height: number = 50;
  #camera: Camera;
  #velocity = new Vector2D(0, 0);

  constructor(
    position: Vector2D,
    name: string,
    color: string | CanvasPattern | CanvasGradient
  ) {
    const width = 50;
    const height = 50;
    super(
      position,
      new RectangleCollisionShape(
        // centers the collisionShape on the player
        new Vector2D(-width / 2, -height / 2),
        width,
        height
      )
    );
    this.#name = name;
    this.#color = color;
    this.#camera = new Camera(new Vector2D(0, 0));
    this.addChild(this.#camera);
    //sets the active camera to the one followingthe player
    GameContext.getInstance().setActiveCamera(this.#camera);
  }

  process(delta: number) {
    this.#handleMovement(delta);
  }

  #handleMovement(delta: number) {
    // move when pressing wasd
    const gameContext = GameContext.getInstance();
    const speed = 1000;
    if (gameContext.isPressed("w")) {
      this.#velocity = this.#velocity.add(new Vector2D(0, -speed));
    }
    if (gameContext.isPressed("a")) {
      this.#velocity = this.#velocity.add(new Vector2D(-speed, 0));
    }
    if (gameContext.isPressed("s")) {
      this.#velocity = this.#velocity.add(new Vector2D(0, speed));
    }
    if (gameContext.isPressed("d")) {
      this.#velocity = this.#velocity.add(new Vector2D(speed, 0));
    }

    // apply the movement
    this.position = this.position.add(this.#velocity.multiply(delta / 1000));

    // reset velocity
    this.#velocity = new Vector2D(0, 0);
  }

  render(ctx: CanvasRenderingContext2D) {
    // render a rectangle with the players size and color with the players position in the center
    ctx.fillStyle = this.#color;
    ctx.fillRect(
      this.globalPosition.x - this.#width / 2,
      this.globalPosition.y - this.#height / 2,
      this.#width,
      this.#height
    );
  }
}
```

```typescript
// src/gameObjects/Box.ts

import {
  RectangleCollisionShape,
  StaticCollisionBody,
  Vector2D,
} from "jf-canvas-game-engine";

export default class Box extends StaticCollisionBody {
  #width: number;
  #height: number;
  #color: string | CanvasPattern | CanvasGradient;
  constructor(
    position: Vector2D,
    width: number,
    height: number,
    color: string | CanvasPattern | CanvasGradient
  ) {
    super(
      position,
      new RectangleCollisionShape(new Vector2D(0, 0), width, height)
    );
    this.#color = color;
    this.#width = width;
    this.#height = height;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.#width,
      this.#height
    );
  }
}
```

Since game objects inherit from EventTarget, they can add listeners to each other. This can be used to create custom events and logic, keeping objects as decoupled as possible.

If you decide to use composition to create game objects, you can add a GameObject as a child to another GameObject. This will make the child object move with the parent object. This can be useful for creating complex objects that are made up of multiple parts. It is a good idea to keep references to the children of your object if you need to communicate between them, just remember that components need to be added to the parent objects children in order to be rendered.

## Class Definition

### GameEngine

> Inherits: none

The main class for the game engine. This class is responsible for starting the game loop and rendering the game.

#### `constructor(canvas: HTMLCanvasElement, scene: GameObject, options: Object = { debug: false })`

Parameters:

- `canvas`: The html canvas element in where the game is rendered.
- `scene`: The game object that should be active at game start.
- `options`: Options that can be passed to affect the game engine on start. options:
  - `debug`: boolean. If the fps counter should be rendered or not.

#### Methods

#### `start()`

start the game loop.

Returns: `void`

<br>

#### `stop()`

stops the game loop. NOT IMPLEMENTED!

Returns: `void`

<br>

#### `canvas`

Gets the html canvas element in where the game is rendered.

Returns: `HTMLCanvasElement`

---

### GameContext

> Inherits: none

A singleton that holds the context of the game.

#### Methods

#### `getInstance()`

Gets the singleton instance of the GameContext.

Returns: `GameContext`

<br>

#### `setGameEngine(gameEngine: GameEngine)`

Sets the game engine.

Parameters:

- `gameEngine`: The game engine to set.

Returns: `void`

<br>

#### `getCanvasCenter()`

Calculates the center of the canvas.

Returns: `Vector2D | null`

<br>

#### `getCanvasLeft()`

Calculates the left position of the canvas.

Returns: `number | null`

<br>

#### `getCanvasTop()`

Calculates the top position of the canvas.

Returns: `number | null`

<br>

#### `setActiveCamera(camera: Camera)`

Sets the active camera.

Parameters:

- `camera`: The camera to set as active.

Returns: `void`

<br>

#### `getActiveCameraPosition()`

Gets the active camera's position.

Returns: `Vector2D | null`

<br>

#### `getCameraTransform()`

Gets the camera transformation.

Returns: `Vector2D | null`

<br>

#### `isActiveCamera(camera: Camera)`

Checks if the given camera is the active camera.

Parameters:

- `camera`: The camera to check.

Returns: `boolean`

<br>

#### `isMouseClicked()`

Checks if the mouse is clicked.

Returns: `boolean`

<br>

#### `getClickData()`

Gets the click data.

Returns: `ClickData | null`

<br>

#### `clearInput()`

Clears the input data (click and key press data).

Returns: `void`

<br>

#### `isPressed(key: string)`

Checks if the given key is pressed.

Parameters:

- `key`: The key to check.

Returns: `boolean`

<br>

#### `isJustPressed(key: string)`

Checks if the given key was just pressed.

Parameters:

- `key`: The key to check.

Returns: `boolean`

<br>

#### `navigateToScene(scene: GameObject)`

Notifies the game engine to navigate to the given scene.

Parameters:

- `scene`: The scene to navigate to.

Returns: `void`

---

### GameObject

> Inherits: EventTarget
> GameObject is an **Abstract** class.

The super class for all objects in a scene. Other classes extend this to add functionality.

#### `constructor(position: Vector2D)`

Parameters:

- `position`: The starting position of the game object.

<br>

#### Methods

#### `getParent()`

Gets the parent GameObject if one exists, otherwise null.

Returns: `GameObject`

<br>

#### `addChild(child: GameObject)`

Adds a child to this objects children.

Parameters:

- `child`: The GameObject to add as child.

Returns: `void`

<br>

#### `removeChild(child: GameObject)`

Removes a child from this objects children.

Parameters:

- `child`: The GameObject child to remove.

Returns: `void`

<br>

#### `getAllChildren()`

Gets all children of this GameObject recursively. meaning the children of the children and so on.

Returns: `GameObject[]`

<br>

#### `position()`

Gets the position of the GameObject.

Returns: `Vector2D`

<br>

#### `position(position: Vector2D)`

Sets the position of the GameObject.
Parameters:

- `position`: The new position.

Returns: `void`

<br>

#### `globalPosition()`

Gets the global position of the GameObject. The global position is the position of the GameObject relative to the root GameObject.

Returns: `Vector2D`

<br>

#### `update(delta: number)`

Called every frame by the game engine. !!!DO NOT OVERRIDE!!!

Parameters:

- `delta`: The time in milliseconds since the last frame.

Returns: `void`

<br>

#### `process(delta: number)`

Called every frame by the game engine. This should be overridden by the user to add custom logic.

- `delta`: The time in milliseconds since the last frame.

Returns: `void`

<br>

#### `draw(ctx: CanvasRenderingContext2D)`

Called every frame by the game engine. !!!DO NOT OVERRIDE!!!

Parameters:

- `ctx`: The rendering context of the canvas element.

Returns: `void`

<br>

#### `render(ctx: CanvasRenderingContext2D)`

Called every frame by the game engine. This should be overridden by the user to add custom rendering logic.

- `ctx`: The rendering context of the canvas element.

Returns: `void`

<br>

#### `remove()`

Removes the GameObject from its parents children. Calls onRemove to clean up the GameObject.

Returns: `void`

<br>

#### `onRemove()`

Called when the GameObject is removed from the game.
calls removeEventListeners and calls onRemove on all children.

Returns: `void`

<br>

#### `removeEventListeners()`

Removes the event listeners from this object. Should be overridden by the user to remove custom event listeners.

Returns: `void`

---

### `Vector2D`

> Inherits: none

Represents a 2D vector.

#### `constructor(x: number, y: number)`

Creates a new `Vector2D` instance.

Parameters:

- `x`: The x component of the vector.
- `y`: The y component of the vector.

<br>

#### Methods

#### `x`

Gets the x component of the vector.

Returns: `number`

<br>

#### `y`

Gets the y component of the vector.

Returns: `number`

<br>

#### `add(v: Vector2D)`

Adds a vector to this vector and returns the result.

Parameters:

- `v`: The vector to add.

Returns: `Vector2D`

<br>

#### `subtract(v: Vector2D)`

Subtracts a vector from this vector and returns the result.

Parameters:

- `v`: The vector to subtract.

Returns: `Vector2D`

<br>

#### `multiply(scalar: number)`

Multiplies the vector by a scalar and returns the result.

Parameters:

- `scalar`: The scalar to multiply the vector by.

Returns: `Vector2D`

<br>

#### `divide(scalar: number)`

Divides the vector by a scalar and returns the result.

Parameters:

- `scalar`: The scalar to divide the vector by.

Returns: `Vector2D`

<br>

#### `magnitude()`

Gets the magnitude of the vector.

Returns: `number`

<br>

#### `normalize()`

Normalizes the vector and returns the result.

Returns: `Vector2D`

<br>

#### `dot(v: Vector2D)`

Gets the dot product of this vector and another vector.

Parameters:

- `v`: The other vector.

Returns: `number`

<br>

#### `angle(v: Vector2D)`

Gets the angle between this vector and another vector.

Parameters:

- `v`: The other vector.

Returns: `number`

<br>

#### `distance(v: Vector2D)`

Gets the distance between this vector and another vector.

Parameters:

- `v`: The other vector.

Returns: `number`

---

### CollisionBody

> Inherits: GameObject < EventTarget

Represents a collision body that can collide and with other collision bodies and be moved by them.

#### Methods

#### `constructor(position: Vector2D, collisionShape: CollisionShape, collisionLayers: CollisionLayers = new CollisionLayers())`

Parameters:

- `position`: The position of the collision body.
- `collisionShape`: The shape of the collision body.
- `collisionLayers`: The collision layers of the collision body.

<br>

#### `collisionShape`

Gets the collision shape of the `CollisionBody`.

Returns: `CollisionShape`

<br>

#### `getCollisionLayers()`

Gets the collision layers of the `CollisionBody`.

Returns: `CollisionLayers`

<br>

#### `isCollidingWith(other: CollisionBody)`

Checks if this `CollisionBody` is colliding with another `CollisionBody`.

Parameters:

- `other`: The other `CollisionBody` to check against.

Returns: `boolean`

<br>

#### `onCollision(other: CollisionBody)`

Handles the collision with another `CollisionBody`.

Parameters:

- `other`: The other `CollisionBody` to handle the collision with.

Returns: `void`

---

### StaticCollisionBody

> Inherits: CollisionBody < GameObject < EventTarget

Represents a static collision body that cannot be moved by other collision bodies.

#### `constructor(position: Vector2D, collisionShape: CollisionShape, collisionLayers: CollisionLayers = new CollisionLayers())`

Parameters:

- `position`: The position of the collision body.
- `collisionShape`: The shape of the collision body.
- `collisionLayers`: The collision layers of the collision body.

---

### CollisionShape

> Inherits: none

> CollisionShape is an **Abstract** class.

Represents a shape that can be used for collision detection.

#### `constructor(position: Vector2D)`

Parameters:

- `position`: The position of the collision shape.

#### Methods

#### `globalPosition`

Gets the global position of the collision shape.

Returns: `Vector2D`

<br>

#### `setParent(parent: CollisionBody)`

Sets the parent of the collision shape.

Parameters:

- `parent`: The parent CollisionBody object.

Returns: `void`

<br>

#### `intersects(other: CollisionShape)`

> Abstract method. To be implemented by subclasses.

Checks if this collision shape intersects with another collision shape.

Parameters:

- `other`: The other collision shape to check against.

Returns: `boolean`

<br>

#### `getIntersectionVector(other: CollisionShape)`

> Abstract method. To be implemented by subclasses.

Gets the intersection vector between this collision shape and another collision shape.

Parameters:

- `other`: The other collision shape to get the intersection vector with.

Returns: `Vector2D`

---

### RectangleCollisionShape

> Inherits: CollisionShape

Represents a rectangle collision shape.

#### `constructor(position: Vector2D, width: number, height: number)`

Parameters:

- `position`: The position of the rectangle.
- `width`: The width of the rectangle.
- `height`: The height of the rectangle.

---

### Area

> Inherits: CollisionBody < GameObject < EventTarget

Represents an area that can be used for collision detection.

#### `constructor(position: Vector2D, collishinShape: CollisionShape, collisionLayers: CollisionLayers = new CollisionLayers())`

Parameters:

- `position`: The position of the area.
- `collisionShape`: The shape of the area.
- `collisionLayers`: The collision layers of the area.

#### Methods

#### `getCollidingBodies()`

Gets the collision bodies that are colliding with this area.

Returns: `CollisionBody[]`

---

### CollisionLayers

> Inherits: none

Represents the collision layers of a collision body. There are 5 layers in total. By default only the first layer is active.

#### `constructor()`

#### Methods

#### `setLayer(layer: number)`

Sets the active layer.

Parameters:

- `layer`: The layer to set as active. Must be between 1 and 5.

Returns: `void`

<br>

#### `getActiveLayers()`

Gets the active layers.

Returns: `number[]`

#### `overlaps(other: CollisionLayers)`

Check if this CollisionLayers overlaps with another CollisionLayers, meaning that they share at least one common layer.

Parameters:

- `other`: The other CollisionLayers to check against.

Returns: `boolean`

---

### Camera

> Inherits: GameObject

Represents a camera that can be used to follow a game object.

#### `constructor(position: Vector2D)`

Parameters:

- `position`: The position of the camera.

---

### ClickData

> Inherits: none

Represents the data of a click event.

#### `constructor(position: Vector2D)`

Parameters:

- `position`: The position of the click event.

#### Methods

#### `position`

Gets the position of the click event.

Returns: `Vector2D`

#### `globalPosition`

Gets the global position of the click event.

Returns: `Vector2D`

---

### UiObject

> Inherits: GameObject < EventTarget

Represents a GameObject that can optionally be rendered with a fixed position on the screen, regardless of the camera position.

#### `constructor(position: Vector2D, fixed: boolean)`

Parameters:

- `position`: The position of the UiObject.
- `fixed`: If the UiObject should be fixed on the screen.

---

### Panel

> Inherits: UiObject < GameObject < EventTarget

Represents a UI object that is used to display information to the user. Currently not fully implemented.

#### `constructor(position: Vector2D, fixed: boolean, width: number, height: number, color: string | CanvasPattern | CanvasGradient, borderOptions: BorderOptions`

Parameters:

- `position`: The position of the panel.
- `fixed`: If the panel should be fixed on the screen.
- `width`: The width of the panel.
- `height`: The height of the panel.
- `color`: The color of the panel.
- `borderOptions`: The border options of the panel.

---

### BorderOptions

> Inherits: none

Represents the options for the border of a panel.

#### `constructor(color: string | CanvasPattern | CanvasGradient, width: number, radius: number)`

Parameters:

- `color`: The color of the border.
- `width`: The width of the border.
- `radius`: The radius of the border.

---

```

```
