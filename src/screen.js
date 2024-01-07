// Everything recarding to the canvases and drawing on them will be handled in this file
import { Settings } from "./settings.js";

class Screen {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  setScreenSize() {
    //Setting an uper Limit for screenwidth
    window.innerWidth >= 1080
      ? (Settings.screenScaling = 1)
      : (Settings.screenScaling = window.innerWidth / 1080);

    //setting width and height
    this.canvas.width = 1080 * Settings.screenScaling;
    this.canvas.height = 720 * Settings.screenScaling;
  }

  async draw(arr, resolve) {
    for (const item of arr) {
      for (const el of item.display) {
        const hasComp = await new Promise((resolve) => {
          if (el.composition) {
            this.ctx.globalCompositeOperation = el.comp;
            resolve();
          } else {
            resolve();
          }
        });

        const isImage = await new Promise((resolve) => {
          if (el.type === "image") {
            let image = new Image();
            image.src = el.img;
            image.onload = () => {
              resolve(image);
            };
          } else {
            resolve();
          }
        });

        await Promise.all([hasComp, isImage])
          .then((promises) => {
            let image = promises[1];
            switch (el.type) {
              case "image":
                this.ctx.drawImage(image, el.x, el.y, el.w, el.h);
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
              default:
                console.log("not a canvas object");
                break;
            }
          })
      }
    }
    return resolve()
  }

  clear(x, y, w, h) {
    this.ctx.clearRect(
      x * Settings.screenScaling,
      y * Settings.screenScaling,
      w * Settings.screenScaling,
      h * Settings.screenScaling
    );
  }
}

const main = new Screen(document.getElementById("canvas"));
const ui = new Screen(document.getElementById("ui"));
const bg = new Screen(document.getElementById("bg"));

export { main, ui, bg };
