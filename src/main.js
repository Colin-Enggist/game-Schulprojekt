//The Main engine coded from the source mentioned

import { Pointer } from "./Inputcontrolles/pointer.js";
import {Scene} from "./scene.js";
import { Settings } from "./settings.js";

class Engine{
    constructor(){
        this.scene = new Scene();
        this.previousTime= Date.now();

        Pointer.init();

        this.run();
    }
    run = ()=>{
        let newTime = Date.now();
        Settings.dt = (newTime - this.previousTime) / 1000;
        this.previousTime = newTime;

        this.scene.run();
        requestAnimationFrame(this.run);
    }
}

window.addEventListener("DOMContentLoaded", ()=>{new Engine});
