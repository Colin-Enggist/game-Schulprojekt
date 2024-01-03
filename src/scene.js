// Controls the displayed scene and in generell the display made with the help from the source

import { Pointer } from "./Inputcontrolles/pointer.js";
import { Display } from "./display.js";
import { Settings } from "./settings.js";

export class Scene{
    constructor(){
        this.setup();
    }

    setup= async ()=>{
        this.canvas =  document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.setScreenSize();
    }
    run(){
        Pointer.pos;
        Settings.data.scenes[0].entitys.forEach((obj)=>{
            Display.draw(obj.display)
        })
        
    }

    setScreenSize(){
        let w = window.innerWidth;
        let h = window.innerHeight;
        this.canvas.width = w; 
        this.canvas.height= h;
    }
}