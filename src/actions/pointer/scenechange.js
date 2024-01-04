//class to attach and listen for an event to occur
import { Pointer } from "../../Inputcontrolles/pointer.js";

export default class Scenechange{
    static #attached=[];
    static #index=[];
    
    
    static add(obj){
        this.#attached.push(obj);
        this.#index.push(obj.name);
        return
    }

    static removebyname(name){
        //find the right index for removal and safe it in c
        var c = this.#index.findIndex(name);
        //check if anything is found and when ther is something delete one entry at index c
        c = -1? console.log("error no element found"): this.#attached.splice(c, 1);

    }

    static removeAll(){
        this.#attached.splice(0,this.#attached.length());
        this.#index.splice(0,this.#index.length());
        return
    }



    static action(value){    
        console.log("sceneaction")
    }

    static listener(){
        this.#attached.forEach((obj)=>{
            if(Pointer.pos.x >= obj.x1 && Pointer.pos.x <= obj.x2 && Pointer.pos.y >= obj.y1 && Pointer.pos.y <= obj.y2){
                
            }else{}
 
        })
        
        return Pointer.event=true
    }
}