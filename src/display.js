// Class managing displaying things on to the canvas

import { Settings } from "./settings.js";


export class Display{
    static #canvas=  document.getElementById("canvas");
    static #ctx = this.#canvas.getContext("2d");

    static async draw(arr){
        arr.forEach((draw)=>{
            if(draw.composition){
                this.composition(draw.comp)
            }
            switch(draw.type){
                case "image":
                   this.image(draw.x,draw.y,draw.w,draw.url)
                break;
                case "rect":
                    this.rect(draw.x,draw.y,draw.w,draw.h,draw.color);
                break;
                case "circle":
                    this.circle(draw.x,draw.y,draw.r,draw.color)
                break;
                case "text":
                    this.text(draw.x,draw.y,draw.size,draw.text,draw.maxw,draw.color)
                break;
                }
            }
        )
    }

    static rect(x, y, w, h, color){
        this.#ctx.fillStyle= color;
        this.#ctx.fillRect(x*Settings.screenScaling,y*Settings.screenScaling,w*Settings.screenScaling,h*Settings.screenScaling);
    }

    static circle(x, y, r, color){
        this.#ctx.beginPath();
        this.#ctx.arc(x*Settings.screenScaling, y*Settings.screenScaling, r*Settings.screenScaling, 0, 2 * Math.PI);
        this.#ctx.fillStyle= color;
        this.#ctx.fill();
       
    }

    static clear(x,y,w,h){
        this.#ctx.clearRect(x*Settings.screenScaling,y*Settings.screenScaling,w*Settings.screenScaling,h*Settings.screenScaling);
    }

    static image(x, y, w, url){
        let img = new Image;
        img.src= url;
        let h = (w / img.width )* img.height;
        img.onload = async()=>{
            
           await this.#ctx.drawImage(img, x*Settings.screenScaling, y*Settings.screenScaling, w*Settings.screenScaling, h*Settings.screenScaling);
        }
    }


    static text(x,y,size,text, maxw, color){
        this.#ctx.fillStyle= "white";
        this.#ctx.fillStyle= color;
        this.#ctx.font = size +" helvetica";
        this.#ctx.fillText(text,x*Settings.screenScaling,y*Settings.screenScaling,maxw*Settings.screenScaling);
    }

    static composition(value){
        this.#ctx.globalCompositeOperation = value;
    }

}