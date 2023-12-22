import { Pointer } from "./Inputcontrolles/pointer.js";
import {Screen} from "./screen.js";
import { Settings } from "./settings.js";

class Engine{
    constructor(){
        this.screen = new Screen();
        this.previousTime= Date.now();

        Pointer.init();

        this.run();
    }
    run = ()=>{
        let newTime = Date.now();
        Settings.dt = (newTime - this.previousTime) / 1000;
        this.previousTime = newTime;

        this.screen.run();
        requestAnimationFrame(this.run);
    }
}

window.addEventListener("DOMContentLoaded", ()=>{new Engine});
