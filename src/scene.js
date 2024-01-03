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
        console.log(Pointer.pos) 
        Pointer.pos;
        Settings.data.scenes[2].entitys.forEach((obj)=>{
            Display.draw(obj.display)
        })
        
    }

    setScreenSize(){
        let w = window.innerWidth;
        Settings.screenScaling = w/1080;
        if(Settings.screenScaling >1){
            Settings.screenScaling = 1;
            let h = 720*Settings.screenScaling;
            this.canvas.width = 1080; 
            this.canvas.height= h;
        }else{
            let h = 720*Settings.screenScaling;
            this.canvas.width = w; 
            this.canvas.height= h;
        }
        
    }
}