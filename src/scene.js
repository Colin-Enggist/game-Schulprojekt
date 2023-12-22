import { Pointer } from "./Inputcontrolles/pointer.js";

export class Scene{
    constructor(){
        this.setup();
    }

    setup= async ()=>{
        this.canvas =  document.getElementById("canvas");
        this.ctx = canvas.getContext("2d")

        this.setScreenSize();
    }
    run(){
        Pointer.pos;
    }

    setScreenSize(){
        let w = window.innerWidth;
        let h = window.innerHeight;
        this.canvas.width = w; 
        this.canvas.height= h;
    }
}