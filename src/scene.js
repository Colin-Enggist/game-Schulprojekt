// Controls the displayed scene and in generell the display made with the help from the source

import { Pointer } from "./Inputcontrolles/pointer.js";
import {Elements} from "./element.js";
import { main,ui,bg } from "./screen.js";

export class Scene{
    constructor(data){
        this.data= data;
    }

    setup= ()=>{
        main.setScreenSize();
        ui.setScreenSize();
        bg.setScreenSize();

        Pointer.actiontypes?.forEach((el)=>{
            return el.resetattached();
        })

       Elements.load(this.data)

        return this.displayEl()
    }

    displayEl(){
        ui.clear(0,0,1080,720);
        main.clear(0,0,1080,720);
        bg.clear(0,0,1080,720);

       
        Elements.ui.forEach((el)=>{ui.draw(el.display)});
        Elements.bg.forEach((el)=>{bg.draw(el.display)});
       // Elements.render("all")
    }

    newframe(){
       //Elements.main.forEach((el)=>{main.draw(el.display);});
    }

    removeEnt(screennumb,elName){
        var c = this.ent[screennumb].findIndex((el)=>el.name=== elName);
        //check if anything is found and when ther is something delete one entry at index c
        c === -1? console.log("error no element found") : this.ent[screennumb].splice(c, 1);
        
    }

    update(screen,entname,valuechanges){
        switch(screen){
            case "ui":
                this.removeEnt(0,entname);
                
            break;
            case "main":

            break;
            case "bg":

            break;
        }
        this.displayEl();
    }

    sceneEvent(event){
        switch(event.type){
            case "rockpaperscissor":
                this.update("ui",event.value,"duhh")
            break;
        }

        Pointer.resetaction();
    }

}