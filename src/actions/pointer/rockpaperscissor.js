//class to attach and listen for an event to occur
import { Pointer } from "../../Inputcontrolles/pointer.js";
import { Settings } from "../../settings.js";
import { Scene } from "../../scene.js";
import { Elements } from "../../element.js";

export default class Rockpaperscissor {
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

  static async action(resolve) {
    const target = Pointer.event.value;
    const data=[];
    await new Promise((resolve)=>{
      
      
      var i = Elements.main.findIndex((item)=>item.name===target);

      data.push(Elements.main[i])

      

      Elements.clearMain();
      
      Elements.add(data[0],"main")

      Pointer.resetaction();

      Scene.update(resolve)
      
      //resolve()
    })
    const phaseOne= await new Promise((resolve)=>{

      Scene.update(resolve)
    })
     
   
    resolve()
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
          execution: "scene",
          type: "rockpaperscissor",
          call: (value) => this.action(value),
          value: obj.action.value,
        });
      }
    });
  }
}
