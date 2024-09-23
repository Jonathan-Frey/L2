# Canvas Game Engine

A module for creating simple 2D games using object oriented programming. Utilizes the HTML Canvas Api for rendering.

Made for the in 2024 as a part of the course 1dv610 at Linnaeus University.

## Usage

### Setting up

The game engine needs access to a canvas element on the screen for rendering. It also needs to be passed an object that extends the GameObject class. This will function as the starting scene or level.

```javascript
// index.js

import { Level1 } from "./scenes/Level1.js";
import { GameEngine } from "jf-canvas-game-engine";

const canvas = document.querySelector("canvas");

// The scene for the first level.
const level1 = new Level1();

const gameEngine = new GameEngine(canvas, level1);

gameEngine.start();
```

```javascript
// src/Level1.js

import {
  BorderOptions,
  GameObject,
  Panel,
  Vector2D,
} from "jf-canvas-game-engine";
import { Box } from "./Box.js";

export class Level1 extends GameObject {
  constructor() {
    super(new Vector2D(0, 0));

    const box = new box(new Vector2D(100, 100), "orange");
    this.addChild(box);

    const player = new Player(new Vector2D(200, 100));
    this.addChild(player);
  }
}
```

```javascript
// src/Box.js

import { StaticCollisionBody } from "jf-canvas-game-engine";

export class Box extends StaticCollisionBody {
  #width = 50;
  #height = 50;
  #color;

  constructor(position, color) {
    super(position);
    this.#color = color;
  }

  render(ctx) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.#width,
      this.#height
    );
  }

  onCollision(other) {
    super.onCollision(other);
    this.#color = "red";
    setTimeOut(() => {
      this.#color = "";
    }, 1000);
  }
}
```
