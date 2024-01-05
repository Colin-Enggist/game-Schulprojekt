//class to attach and listen for an event to occur
import { Pointer } from "../../Inputcontrolles/pointer.js";

export default class Scenechange{
    static #attached=[];
    static #index=[];
    
    
    static add(obj){
        this.#attached.push(obj);
        this.#index.push(obj.name);
        console.log(obj)
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



    static action(){
        
    }

    static listener(){
        this.#attached.forEach((obj)=>{
            if(Pointer.pos.x >= obj.pos.x && Pointer.pos.x <= obj.pos.x+obj.dim.w && Pointer.pos.y >= obj.pos.y && Pointer.pos.y <= obj.pos.y+obj.dim.h){
                return Pointer.event={state:true,execution: "engine",type:"scenechange",call:(value)=>this.action(value),value:obj.action.value}
            }
        })
    }
}