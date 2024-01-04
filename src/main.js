//The Main engine coded from the source mentioned

import { Pointer } from "./Inputcontrolles/pointer.js";
import {Scene} from "./scene.js";
import { Settings } from "./settings.js";
import { main, bg, ui } from "./screen.js";

class Engine{
    constructor(){        
        this.boot() 
    }

    async boot(){
        //make the fetch request to get all data for every game object from data.json and some other operations
        await fetch("./data/data.json")
        .then(response=>{return response.json()})
        .then(data=> Settings.data= data)
        .then(this.previousTime= Date.now())
        .then(Pointer.init())

       // wait until every scene is loaded and display first frame
        await this.loadscenes()

        // return with starting the loop
        return this.run()
    }

    loadscenes(){
       this.reference = Settings.data.index;
       this.currentscene = 0;
        this.scenes=[];
        Settings.data.scenes.forEach((scene)=>{
            this.scenes.push(new Scene(scene));
        })
        return  this.scenes[this.currentscene].setup();
    }

    


    run = ()=>{
        let newTime = Date.now();
        Settings.dt = (newTime - this.previousTime) / 1000;
        this.previousTime = newTime;

        Pointer.pos
        Pointer.action

        console.log(Pointer.pos,Pointer.action)
        this.scenes[this.currentscene].ent[1].forEach((el)=>{main.draw(el.display);});


        requestAnimationFrame(this.run);
    }
}

window.addEventListener("DOMContentLoaded", ()=>{new Engine});
