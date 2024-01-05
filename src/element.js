// Class managing displaying things on to the canvases and making them objects

import { Settings } from "./settings.js";

export class Element {
  constructor(type, name,pos, actions, arr) {
    this.type = type;
    this.name = name;
    this.pos = pos;
    this.actions = actions; //need to implement boot up method
    this.display = []; // will be loaded in init function
    this.init(arr);
  }

  init(arr) {
    //preloading each display array element for faster loading
      this.loadDisplay(arr)
  }

  loadDisplay(arr){
    arr.forEach((el) => {
      // images treated differently in having the img property
      if (el.type === "image") {
        let image = new Image();
        image.src = el.url;

        // creating the object
        let obj = {
          type: el.type,
          img: image,
          x: (parseFloat(el.x) + parseFloat(this.pos.x)) * Settings.screenScaling,
          y: (parseFloat(el.y) + parseFloat(this.pos.y)) * Settings.screenScaling,
          w: el.w * Settings.screenScaling,
          maxw: el.maxw? el.maxw * Settings.screenScaling: undefined,
          h: (el.w / image.width) * image.height * Settings.screenScaling,
          r: el.r? el.r : undefined,
          size: el.size? el.size : undefined,
          color: el.color? el.color : undefined,
          text: el.text? el.text : undefined,
          composition: el.composition ? el.composition : false,
          comp: el.comp || undefined,
        };
        //pushin object in array
        return this.display.push(obj);
      }else{
        //creating normal object
        let obj = {
          type: el.type,
          x: (parseFloat(el.x) + parseFloat(this.pos.x)) * Settings.screenScaling,
          y: (parseFloat(el.y) + parseFloat(this.pos.y)) * Settings.screenScaling,
          w: el.w? el.w * Settings.screenScaling: undefined,
          maxw: el.maxw? el.maxw * Settings.screenScaling: undefined,
          h: el.h? el.h * Settings.screenScaling : undefined,
          r: el.r? el.r : undefined,
          size: el.size? el.size : undefined,
          color: el.color? el.color : undefined,
          text: el.text? el.text : undefined,
          composition: el.composition ? el.composition : false,
          comp: el.comp || undefined,
        };
        //pushing it in the array
        return (this.display.push(obj),console.log(obj));
      }
    });
  }
  
}
