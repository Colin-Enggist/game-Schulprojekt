# Project Description

**Project Overview**

This project involved creating a simple game engine and implementing two games, Rock Paper Scissors and Snake, using JavaScript. The game engine is responsible for managing scenes, screens, elements, and user input.

**Installation and Running**

To run the application, you need npm installed. Follow these steps:

1. Install Node modules by running:
    
    npm install

2. Start the local development server with the command:

    npm start

**The Game Engine**

The game engine consists of several key files: `main.js`, `scene.js`, `screen.js`, `element.js`, and `settings.js`.

- `main.js` serves as the entry point and orchestrates the entire game engine. It initializes the engine, passes data to the appropriate components, handles events, and manages the game loop.

- `scene.js` is responsible for managing the contents of each scene. It acts as an intermediary between `main.js` and the various canvas elements.

- `screen.js` contains functions specific to each canvas element, such as UI, background, and main gameplay canvas.

- `element.js` stores information about all displayed elements, including their appearance and associated logic.

In the `Inputcontrolles` folder, you'll find different input methods. `Pointer.js` handles mouse input, and `Keys.js` manages keyboard events. These files define potential events and their corresponding actions. Actual event handling and logic are implemented elsewhere.

**Notation**

`data.json` defines the structure of the game, scenes, and elements. Here's a breakdown of the `data.json` notation:

- `"index"`: An index that lists scene names in the order they appear in the `"scenes"` array.

- `"scenes"`: An array of scene objects, each containing data for a specific scene. Each scene object has the following properties:
- `"name"`: The name of the scene.
- `"index"`: An optional index for the scene.
- `"ui"`: An array of UI elements for the scene.
- `"entitys"`: An array of main gameplay elements for the scene.
- `"bg"`: An array of background elements for the scene.

UI elements, entity elements, and background elements are defined using various properties such as `"type"`, `"name"`, `"pos"`, `"dim"`, `"actions"`, and `"display"`. The `"display"` property includes information required for rendering each element.

**Actions Notation**

Actions are defined using a class called `action`. Actions can be attached to elements, and they specify the behavior of elements when certain events occur. Here's an example of the `action` class notation:

```javascript
export default class action {
static #attached = [];
static #index = [];

static add(obj) {
 // Add elements with respective actions to this.#attached.
 this.#attached.push(obj);
 // Create a reference array for each obj name (unnecessary step).
 this.#index.push(obj.name);
}

static removebyname(name) {
 // Remove an element from this.#attached by its name.
 var c = this.#index.indexOf(name);
 c = -1
   ? console.log("error: no element found")
   : this.#attached.splice(c, 1);
}

static removeAll() {
 // Remove all elements from this.#attached and this.#index.
 this.#attached.splice(0, this.#attached.length);
 this.#index.splice(0, this.#index.length);
}

static action(resolve) {
 // Method called when an event triggers this action.
}

static listener() {
 // Define the conditions and logic for this action to trigger.
}
}

Resources

YouTube Tutorial for Game Development https://www.youtube.com/watch?v=Y2NUdjkt5M4&t=1587s
 