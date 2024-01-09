//class to attach and listen for an event to occur
import { Keys } from "../../../Inputcontrolles/keys.js";
import { Elements } from "../../../element.js";
import { main } from "../../../screen.js";
import { Settings } from "../../../settings.js";

export default class Snake {
  static #attached = [];
  static #index = [];
  static head;
  static body = [];
  static points;
  static food;
  static isInit = false;

  static add(obj) {
    var i = Settings.data.index.indexOf("snake");
    const arr = JSON.parse(JSON.stringify(Settings.data.scenes[i]));
    this.points=2;
    this.#attached.push(obj);
    this.#index.push(obj.name);
    if (this.isInit === false) {
      this.head = arr.entitys.find((el) => (el.type = "player"));
      this.head.actions = [];

      this.body = arr.entitys.filter((el) => el.type === "body");
      this.body.forEach((el) => (el.actions = []));
      

      this.food = arr.entitys.find((el) => (el.type = "goal"));
      this.food.actions = [];

      console.log(this.head, this.body, this.food);
      return (this.isInit = true);
    }
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

    return;
  }

  static action(resolve) {
    const compute = {
      entitys: [],
    };

    const playrmove = () => {
      switch (Keys.event.value) {
        case "forward":
          this.head.pos.y = parseInt(this.head.pos.y) - 5;
          this.head.display = [
            {type: "rect", x: "0", y: "0", w: "30", h: "30", color: "darkblue"},
            { type: "circle", x: "15", y: "0", r: "15", color: "darkblue" },
          ];
          this.body[0].pos = { x: this.head.pos.x, y: this.head.pos.y + 40 };
          break;
        case "back":
          this.head.pos.y = parseInt(this.head.pos.y) + 5;
          this.head.display = [
            {type: "rect", x: "0", y: "0", w: "30", h: "30", color: "darkblue"},
            { type: "circle", x: "15", y: "30", r: "15", color: "darkblue" },
          ];
          this.body[0].pos = { x: this.head.pos.x, y: this.head.pos.y - 40 };
          break;
        case "right":
          this.head.pos.x = parseInt(this.head.pos.x) + 5;
          this.head.display = [
            {type: "rect", x: "0", y: "0", w: "30", h: "30", color: "darkblue"},
            { type: "circle", x: "30", y: "15", r: "15", color: "darkblue" },
          ];
          this.body[0].pos = { x: this.head.pos.x - 40, y: this.head.pos.y };
          break;
        case "left":
          this.head.pos.x = parseInt(this.head.pos.x) - 5;
          this.head.display = [
            {type: "rect", x: "0", y: "0", w: "30", h: "30", color: "darkblue"},
            { type: "circle", x: "0", y: "15", r: "15", color: "darkblue" },
          ];
          this.body[0].pos = { x: this.head.pos.x + 40, y: this.head.pos.y };
          break;
      }

      compute.entitys.push(this.head);
      compute.entitys.push(...this.body);
    };

    playrmove();

    Elements.clearMain();
    Elements.populate(compute, "main");
    main.clear(0, 0, 1080, 720);
    main.draw(Elements.main, resolve);

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
