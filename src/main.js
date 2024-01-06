//The Main engine coded from the source mentioned

import { Pointer } from "./Inputcontrolles/pointer.js";
import {Scene} from "./scene.js";
import {Settings} from "./settings.js";

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
        .then(()=>{
            this.reference=Settings.data.index
            this.scenes=[];
            Settings.data.scenes.forEach((scene)=>{
            this.scenes.push(new Scene(scene));
        })})

       // wait until every scene is loaded and display first frame
        this.loadscenes("boot")

        // return with starting the loop
        return this.run()
    }

    loadscenes(sceneIndex){
        if(sceneIndex === "boot"){
            this.currentscene = 0;
            this.scenes[this.currentscene].setup()
            return 
        }else{
            this.currentscene = this.reference.indexOf(sceneIndex);
            this.currentscene === -1? console.log("Error: scene not found") : this.scenes[this.currentscene].setup();
            return
        }
    }

    input(){
        Pointer.pos
        Pointer.event
        
        if(Pointer.event.state){
            return Pointer.event
        }else{return {state:false,type:undefined}}
    }

    engineevents(event){
        switch(event.type){
            case "scenechange":
                this.loadscenes(event.value);
                
            break;
        }
        Pointer.resetaction();
        return
    }


    run = async ()=>{
        let newTime = Date.now();
        Settings.dt = (newTime - this.previousTime) / 1000;
        this.previousTime = newTime;

        var event =  await this.input()
        
        if(event.state==false){
        await this.scenes[this.currentscene].newframe()
        return requestAnimationFrame(this.run);
    }else{
        switch(event.execution){
            case "engine":
                await this.engineevents(event)
            break;
            case "scene":
                await this.scenes[this.currentscene].sceneEvent(event);
            break;
        }
        return requestAnimationFrame(this.run);
    }
    
    }
}

window.addEventListener("DOMContentLoaded", ()=>{new Engine});