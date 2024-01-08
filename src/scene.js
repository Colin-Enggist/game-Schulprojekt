// Controls the displayed scene and in generell the display made with the help from the source

import { Keys } from "./Inputcontrolles/keys.js";
import { Pointer } from "./Inputcontrolles/pointer.js";
import {Elements} from "./element.js";
import { main,ui,bg } from "./screen.js";

export class Scene{
   
    static setup= async (data,res)=>{

        const canvasPromise= await new Promise((resolve)=>{
            main.setScreenSize()
            ui.setScreenSize()
            bg.setScreenSize()
            return resolve()
        })
        
        const resetPromise= await new Promise((resolve)=>{
            Pointer.actiontypes?.forEach((el)=>{
                return el.resetattached();
            })
            Keys.actiontypes.forEach((el)=>{
                return el.resetattached();
            })
            Elements.clearAll()
            return resolve()
        })

        const loaded= await new Promise((resolve)=>{
            Elements.load(data)
            return resolve()
        })

        const displayed= await new Promise((resolve)=>{
            this.update(resolve) 
        })
        
        
        await Promise.all([canvasPromise, resetPromise, loaded, displayed])
        .then(res())
        
        return 
    }

    static async update(res){
        
        const cleared= await new Promise((resolve)=>{
            ui.clear(0,0,1080,720);
            main.clear(0,0,1080,720);
            bg.clear(0,0,1080,720);
            resolve()
        })
        
        const DisplayUi = await new Promise((resolve)=>{
            ui.draw(Elements.ui, resolve)
        })

        const DisplayBg = await new Promise((resolve)=>{
            bg.draw(Elements.bg, resolve)
            
        })

        const DisplayMain = await new Promise((resolve)=>{
            main.draw(Elements.main,resolve)
        })
       
        
        await Promise.all([cleared, DisplayUi,DisplayMain, DisplayBg])
        .then(res())
    }

    static newframe(res){ 
       main.draw(Elements.main,res)
    }

}