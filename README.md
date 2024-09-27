# Canvas Game Engine

A module for creating simple 2D games using object oriented programming. Utilizes the HTML Canvas Api for rendering.

Made for the in 2024 as a part of the course 1dv610 at Linnaeus University.

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

## Class Definition

### GameEngine

this is a breaf description

**Constructor**

| Parameter | Type              | Description                                                             |
| --------- | ----------------- | ----------------------------------------------------------------------- |
| canvas    | HTMLCanvasElement | The html canvas element in where the game is rendered.                  |
| scene     | GameObject        | The game object that should be active at game start.                    |
| options   | Object            | Options that can be passed to affect the game engine on start. options: |
|           |                   | debug: boolean. If the fps counter should be rendered or not.           |

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

### GameObject

> GameObject is an **Abstract** class.

The super class for all objects in a scene. Other classes extend this to add functionality.

#### Constructor

| Parameter | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| position  | Vector2D | The starting position of the game object. |

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

### GameContext

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

### `Vector2D`

A class representing a 2D vector.

#### `constructor(x: number, y: number)`

Creates a new `Vector2D` instance.

Parameters:

- `x`: The x component of the vector.
- `y`: The y component of the vector.

<br>

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
