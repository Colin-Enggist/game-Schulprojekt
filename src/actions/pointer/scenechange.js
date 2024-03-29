//class to attach and listen for an event to occur
import { Pointer } from "../../Inputcontrolles/pointer.js";
import { Settings } from "../../settings.js";
import { Scene } from "../../scene.js";

export default class Scenechange {
  static #attached = [];
  static #index = [];

  static add(obj) {
    this.#attached.push(obj);
    this.#index.push(obj.name);
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
    return;
  }

  static action(resolve) {
    
    
    var i =  Settings.data.index.indexOf(Pointer.event.value)

      Pointer.resetaction();
      Scene.setup(Settings.data.scenes[i],resolve);

  }

  static listener() {
    this.#attached.forEach((obj) => {
      if (
        Pointer.pos.x >= parseFloat(obj.pos.x) * Settings.screenScaling &&
        Pointer.pos.x <= (parseFloat(obj.pos.x) + parseFloat(obj.dim.w)) * Settings.screenScaling &&
        Pointer.pos.y >= parseFloat(obj.pos.y) * Settings.screenScaling &&
        Pointer.pos.y <= (parseFloat(obj.pos.y) + parseFloat(obj.dim.h)) * Settings.screenScaling
      ) {
        return (Pointer.event = {
          state: true,
          execution: "engine",
          type: "scenechange",
          call: (value) => this.action(value),
          value: obj.action.value,
        });
      }
    });
  }
}
