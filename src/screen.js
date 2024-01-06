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

  async draw(arr) {
    try {
      // render with return of the promise
      const render = (el) => {
        if (el.composition) {
          this.ctx.globalCompositeOperation = el.comp;
        }
        return new Promise((resolve, reject) => {
          switch (el.type) {
            case "image":
              let image = new Image();
              image.src = el.img;
              image.onload = () => {
                this.ctx.drawImage(image, el.x, el.y, el.w, el.h);
                return resolve();
              };
              break;
            case "rect":
              this.ctx.fillStyle = el.color;
              this.ctx.fillRect(el.x, el.y, el.w, el.h, el.color);
              resolve();
              break;
            case "circle":
              this.ctx.beginPath();
              this.ctx.arc(el.x, el.y, el.r, 0, 2 * Math.PI);
              this.ctx.fillStyle = el.color;
              this.ctx.fill();
              resolve();
              break;
            case "text":
              this.ctx.fillStyle = "white";
              this.ctx.fillStyle = el.color;
              this.ctx.font = el.size + " helvetica";
              this.ctx.fillText(el.text, el.x, el.y, el.maxw);
              resolve();
              break;
            default:
              console.log("not a canvas object");
              reject();
              break;
          }
        });
      };
      //waiting for all promises from render on all array elements
      await Promise.all(arr.map(render))
    } catch (err) {
      console.log(err);
    }
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
