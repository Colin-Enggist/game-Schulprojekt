// Class managing displaying things on to the canvases and making them objects

import { Settings } from "./settings.js";

export class Element {
  constructor(type, name, ctx, actions, arr) {
    this.type = type;
    this.name = name;
    this.actions = actions; //need to implement boot up method
    this.display = []; // will be loaded in init function
    this.ctx = ctx; //ctx for respective canvas
    this.init(arr);
  }

  init(arr) {
    //preloading each display array element for faster loading
    arr.forEach((el) => {
      // images treated differently in having the img property
      if (el.type === "image") {
        let image = new Image();
        image.src = el.url;

        // creating the object
        let obj = {
          type: el.type,
          img: image,
          x: el.x * Settings.screenScaling,
          y: el.y * Settings.screenScaling,
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
          x: el.x * Settings.screenScaling,
          y: el.y * Settings.screenScaling,
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
        return this.display.push(obj);
      }

     
    });
  }

  draw() {
    this.display.forEach((el) => {
      if (el.composition) {
        this.ctx.globalCompositeOperation = el.comp;
      }
      switch (el.type) {
        case "image":
          el.img.onload = () => {
            this.ctx.drawImage(el.img, el.x, el.y, el.w, el.h);
          };
          break;
        case "rect":
          this.ctx.fillStyle = el.color;
          this.ctx.fillRect(el.x, el.y, el.w, el.h, el.color);
          break;
        case "circle":
          this.ctx.beginPath();
          this.ctx.arc(el.x, el.y, el.r, 0, 2 * Math.PI);
          this.ctx.fillStyle = el.color;
          this.ctx.fill();
          break;
        case "text":
          this.ctx.fillStyle = "white";
          this.ctx.fillStyle = el.color;
          this.ctx.font = el.size + " helvetica";
          this.ctx.fillText(el.text, el.x, el.y, el.maxw);
          break;
      }
    });
  }

  static clear(x, y, w, h) {
    this.ctx.clearRect(
      x * Settings.screenScaling,
      y * Settings.screenScaling,
      w * Settings.screenScaling,
      h * Settings.screenScaling
    );
  }
}
