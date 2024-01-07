// Class managing displaying things on to the canvases and making them objects

import { Settings } from "./settings.js";
import { Pointer } from "./Inputcontrolles/pointer.js";

export class Elements {
  // gets all elemenst that the are visible in the current scene, loads them and stores them in respective arrays to their screen
  static #ui = [];
  static #bg = [];
  static #main = [];

  static get ui() {
    return this.#ui;
  }
  static get bg() {
    return this.#bg;
  }
  static get main() {
    return this.#main;
  }

  static add(obj, screen) {
    switch (screen) {
      case "ui":
        this.#ui.push(obj);
        break;
      case "main":
        this.#main.push(obj);
        break;
      case "bg":
        this.#bg.push(obj);
        break;
    }
  }

  static load(el) {
    this.populate(el, "ui");
    this.populate(el, "main");
    this.populate(el, "bg");
  }

  static populate(data, destination) {
    // building and calculating the object as needed for the engine
    const build = (item) => {
      //building every value of item.display
      let displaybuild =[];
      //looping through the display array
      item.display.forEach((el)=>{
        
        return displaybuild.push({
          type: el.type,
          img: el.url,
          x:(parseFloat(el.x) + parseFloat(item.pos.x)) * Settings.screenScaling,
          y:(parseFloat(el.y) + parseFloat(item.pos.y)) * Settings.screenScaling,
          w: el.w * Settings.screenScaling,
          maxw: el.maxw ? el.maxw * Settings.screenScaling : undefined,
          h: el.h ? el.h * Settings.screenScaling : undefined,
          r: el.r ? el.r : undefined,
          size: el.size ? el.size : undefined,
          color: el.color ? el.color : undefined,
          text: el.text ? el.text : undefined,
          composition: el.composition ? el.composition : false,
          comp: el.comp || undefined,
        })
      })
      //building everything from item.action
      let actionbuild= []
      //looping through action array
      item.actions?.forEach((el)=>{
        // checking if any Pointeractiontypes match
        Pointer.actiontypes.map((check) => {
          if (check.type === el.type) {
            return check.getattached({
              type: item.type,
              name: item.name,
              pos: item.pos,
              dim: item.dim,
              action: el,
              display: item.display,
            });
          } else {
          }
        });
        // after each action element push it in the actionbuild array
        return actionbuild.push(item.actions);
      });

      // were everything is coming together 
      return {
        type: item.type,
        name: item.name,
        pos: item.pos,
        dim: item.dim,
        display: displaybuild,
        actions: actionbuild
      };
    };
    // the basic thing to add everything to it's according array and building each entry with the steps before
    switch (destination) {
      case "ui":
        data.ui.map((el) => this.add(build(el), "ui"));
        break;
      case "main":
        data.entitys.map((el) => this.add(build(el), "main"));
        break;
      case "bg":
        data.bg.map((el) => this.add(build(el), "bg"));
        break;
    }
  }

  static removeByName(name,screen){
    switch (screen){
      case "ui":
        var index =this.#ui.findIndex((item)=>item.name == name);
        this.#ui.splice(index,1);
        break;
      case "main":
        var index =this.#main.findIndex((item)=>item.name == name);
        this.#main.splice(index,1);
        break;
      case "bg":
        var index =this.#bg.findIndex((item)=>item.name == name);
        this.#bg.splice(index,1);
        break;
    }
  }

  static clearMain(){
    this.#main.splice(0,this.#main.length)
  }

  static clearAll(){
    this.#ui.splice(0,this.#ui.length)
    this.#bg.splice(0,this.#bg.length)
    this.#main.splice(0,this.#main.length)
    return
  }
}
