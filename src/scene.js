// Controls the displayed scene and in generell the display made with the help from the source

import { Pointer } from "./Inputcontrolles/pointer.js";
import { Element} from "./element.js";
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

        this.preloadElements(this.data)
        return this.displayEl()
    }

    preloadElements(data){
        //array for all entetys in screen [[ui],[main],[bg]]
        this.ent=[[],[],[]];

        data.ui.forEach((item)=>{
          this.ent[0].push(new Element(item.type,item.name,item.pos,item.dim,item.actions,item.display));
        })

        data.bg.forEach((item)=>{
            this.ent[2].push(new Element(item.type,item.name,item.pos,item.dim,item.actions,item.display))
        })

        data.entitys.forEach((item)=>{
            this.ent[1].push(new Element(item.type,item.name,item.pos,item.dim,item.actions,item.display))})

        return
    }

    displayEl(){
        this.ent[0].forEach((el)=>{ui.draw(el.display);});
        this.ent[2].forEach((el)=>{bg.draw(el.display);});
        this.ent[1].forEach((el)=>{main.draw(el.display);}); 
    }

    update(){
        
        this.ent[1].forEach((el)=>{main.draw(el.display);});
    }

}