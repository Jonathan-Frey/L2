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

#### `get canvas()`

Gets the html canvas element in where the game is rendered.

Returns: `HTMLCanvasElement`

<br>

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

#### `addChild(child)`

Adds a child to this objects children.

| Parameter | Type       | Description                     |
| --------- | ---------- | ------------------------------- |
| child     | GameObject | The GameObject to add as child. |

Returns: `void`

<br>

#### `removeChild(child)`

Removes a child from this objects children.

| Parameter | Type       | Description               |
| --------- | ---------- | ------------------------- |
| child     | GameObject | The GameObject to remove. |

Returns: `void`

<br>

#### `getAllChildren()`

Gets all children of this GameObject recursively. meaning the children of the children and so on.

Returns: `GameObject[]`

<br>

#### `get position()`

Gets the position of the GameObject.

Returns: `Vector2D`

<br>

#### `set position(position)`

Sets the position of the GameObject.

| Parameter | Type     | Description       |
| --------- | -------- | ----------------- |
| position  | Vector2D | The new position. |

Returns: `void`

<br>

#### `get globalPosition()`

Gets the global position of the GameObject. The global position is the position of the GameObject relative to the root GameObject.

Returns: `Vector2D`

<br>

#### `update(delta)`

Called every frame by the game engine. !!!DO NOT OVERRIDE!!!

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| delta     | number | The time in milliseconds since the last frame. |

Returns: `void`

<br>

#### `process(delta)`

Called every frame by the game engine. This should be overridden by the user to add custom logic.

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| delta     | number | The time in milliseconds since the last frame. |

Returns: `void`

<br>

#### `draw(ctx)`

Called every frame by the game engine. !!!DO NOT OVERRIDE!!!

| Parameter | Type                     | Description                         |
| --------- | ------------------------ | ----------------------------------- |
| ctx       | CanvasRenderingContext2D | The rendering context of the canvas |

Returns: `void`

<br>

#### `render(ctx)`

Called every frame by the game engine. This should be overridden by the user to add custom rendering logic.

| Parameter | Type                     | Description                         |
| --------- | ------------------------ | ----------------------------------- |
| ctx       | CanvasRenderingContext2D | The rendering context of the canvas |

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
