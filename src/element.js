// Class managing displaying things on to the canvases and making them objects

import { Settings } from "./settings.js";

export class Element {
  constructor(type, name, ctx, actions, arr) {
    this.type = type;
    this.name = name;
    this.actions = actions; //need to implement boot up method
    this.display = []; // will be preloaded in init function
    this.ctx = ctx; //ctx for respective canvas
    this.init(arr);
  }

  init(arr) {
    //preloading each display array element for faster loading
    arr.forEach((el) => {
      switch (el.type) {
        case "image":
          //preloading image object
          let image = new Image();
          image.src=el.url;
          //checking if composition settings are needed and push entrie's accordingly
            if (el.composition) {
              this.display.push({
                type: el.type,
                img: image,
                x: el.x * Settings.screenScaling,
                y: el.y * Settings.screenScaling,
                w: el.w * Settings.screenScaling,
                h: (el.w / image.width) * image.height * Settings.screenScaling,
                composition: el.composition,
                comp: el.comp,
              });
            } else {
              this.display.push({
                type: el.type,
                img: image,
                x: el.x * Settings.screenScaling,
                y: el.y * Settings.screenScaling,
                w: el.w * Settings.screenScaling,
                h: (el.w / image.width) * image.height * Settings.screenScaling,
              });
            }
          break;
        //same as before for other elements
        case "rect":
          if (el.composition) {
            this.display.push({
              type: el.type,
              x: el.x * Settings.screenScaling,
              y: el.y * Settings.screenScaling,
              w: el.w * Settings.screenScaling,
              h: el.h * Settings.screenScaling,
              color: el.color,
              composition: el.composition,
              comp: el.comp,
            });
          } else {
            this.display.push({
              type: el.type,
              x: el.x * Settings.screenScaling,
              y: el.y * Settings.screenScaling,
              w: el.w * Settings.screenScaling,
              h: el.h * Settings.screenScaling,
              color: el.color,
            });
          }
          break;
        case "circle":
          if (el.composition) {
            this.display.push({
              type: el.type,
              x: el.x * Settings.screenScaling,
              y: el.y * Settings.screenScaling,
              r: el.r * Settings.screenScaling,
              color: el.color,
              composition: el.composition,
              comp: el.comp,
            });
          } else {
            this.display.push({
              type: el.type,
              x: el.x * Settings.screenScaling,
              y: el.y * Settings.screenScaling,
              r: el.r * Settings.screenScaling,
              color: el.color,
            });
          }
          break;
        case "text":
          if (el.composition) {
            this.display.push({
              type: el.type,
              x: el.x * Settings.screenScaling,
              y: el.y * Settings.screenScaling,
              size: el.size,
              text: el.text,
              maxw: el.maxw * Settings.screenScaling,
              color: el.color,
              composition: el.composition,
              comp: el.comp,
            });
          } else {
            this.display.push({
              type: el.type,
              x: el.x * Settings.screenScaling,
              y: el.y * Settings.screenScaling,
              size: el.size,
              text: el.text,
              maxw: el.maxw * Settings.screenScaling,
              color: el.color,
            });
          }
          break;
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
            el.img.onload= ()=>{
              this.ctx.drawImage(el.img, el.x, el.y, el.w, el.h);
            }
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
