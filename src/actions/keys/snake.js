//class to attach and listen for an event to occur
import { Keys } from "../../Inputcontrolles/keys.js";

export default class Snake {
  static #attached = [];
  static #index = [];

  static add(obj) {
    this.#attached.push(obj);
    this.#index.push(obj.name);
    Keys.event = {
        state: true,
        execution: "scene",
        type: "snake",
        call: (value) => this.action(value),
        value: "forward",
      };
    console.log("snek attach");
    return;
  }

  static removebyname(name) {
    //find the right index for removal and safe it in c
    var c = this.#index.indexOf(name);
    //check if anything is found and when ther is something delete one entry at index c
    c = -1
      ? console.log("error no element found")
      : this.#attached.splice(c, 1);
  }

  static removeAll() {
    this.#attached.splice(0, this.#attached.length);
    this.#index.splice(0, this.#index.length);
    console.log("snek reset");
    return;
  }

  static action(resolve) {
    console.log(Keys.event.value);
    resolve()
  }

  static listener() {
    // check for input that triggers action
    switch (Keys.input) {
      case "w":
        Keys.event = {
          state: true,
          execution: "scene",
          type: "snake",
          call: (value) => this.action(value),
          value: "forward",
        };
        break;
      case "a":
        Keys.event = {
          state: true,
          execution: "scene",
          type: "snake",
          call: (value) => this.action(value),
          value: "left",
        };
        break;
      case "d":
        Keys.event = {
          state: true,
          execution: "scene",
          type: "snake",
          call: (value) => this.action(value),
          value: "right",
        };
        break;
      case "s":
        Keys.event = {
          state: true,
          execution: "scene",
          type: "snake",
          call: (value) => this.action(value),
          value: "back",
        };
        break;
    }
  }
}
