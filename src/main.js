//The Main engine coded from the source mentioned

import { Pointer } from "./Inputcontrolles/pointer.js";
import {Scene} from "./scene.js";
import { Settings } from "./settings.js";

class Engine{
    constructor(){        
        this.boot()
        .then(this.previousTime= Date.now())
        .then(this.run)
        
    }

    async boot(){
        await fetch("./data/data.json")
        .then(response=>{return response.json()})
        .then(data=> Settings.data= data)
        .then(Pointer.init())


        this.menue = new Scene()
        this.menue.setup(Settings.data.scenes[0])
        
        return 
    }

    run = ()=>{
        let newTime = Date.now();
        Settings.dt = (newTime - this.previousTime) / 1000;
        this.previousTime = newTime;

        this.menue.run();
        
        requestAnimationFrame(this.run);
    }
}

window.addEventListener("DOMContentLoaded", ()=>{new Engine});
