// Controls the displayed scene and in generell the display made with the help from the source

import { Element} from "./element.js";
import { Settings } from "./settings.js";
import { Pointer } from "./Inputcontrolles/pointer.js";
import { main,ui,bg } from "./screen.js";

export class Scene{
    constructor(data){
        this.data= data;
    }

    setup= async ()=>{
        main.setScreenSize();
        ui.setScreenSize();
        bg.setScreenSize();

        await this.preloadElements(this.data)
        return this.displayEl()
    }

    async preloadElements(data){
        this.uiEl=[];
        await data.ui.forEach((item)=>{
          this.uiEl.push(new Element(item.type,item.name,item.actions,item.display));
        })

        this.bgEl=[];
        await data.bg.forEach((item)=>{
            this.bgEl.push(new Element(item.type,item.name,item.actions,item.display))
        })

        this.entEl=[];
        await data.entitys.forEach((item)=>{
            this.entEl.push(new Element(item.type,item.name,item.actions,item.display))})

        return
    }

    displayEl(){
        this.uiEl.forEach((el)=>{ui.draw(el.display);});
        this.bgEl.forEach((el)=>{bg.draw(el.display);});
        this.entEl.forEach((el)=>{main.draw(el.display);}); 
    }


    run(){
        Pointer.pos
        Pointer.action

        console.log(Pointer.pos,Pointer.action)
        this.entEl.forEach((el)=>{main.draw(el.display);});
    }
}