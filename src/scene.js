// Controls the displayed scene and in generell the display made with the help from the source

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
            Elements.clearAll()
            return resolve()
        })

        const loaded= await new Promise((resolve)=>{
            Elements.load(data)
            return resolve()
        })

        const displayed= await new Promise((resolve)=>{
            this.displayEl(resolve) // BUUUG resolve comes before elements are actually displayed
        })

        
        await Promise.all([canvasPromise, resetPromise, loaded, displayed])
        .then(res())
        
        return 
    }

    static async displayEl(res){

        const cleared= await new Promise((resolve)=>{
            ui.clear(0,0,1080,720);
            main.clear(0,0,1080,720);
            bg.clear(0,0,1080,720);
            resolve()
        })
        
        const DisplayUi = await new Promise((resolve)=>{
            ui.draw(Elements.ui)
            //need to work on the draw resolve
            return resolve()
        })

        const DisplayBg = await new Promise((resolve)=>{
            bg.draw(Elements.bg)
            
            //need to work on the draw resolve
            return resolve()
        })

        await Promise.all([cleared, DisplayUi, DisplayBg])
        .then(res())
    }

    static newframe(res){ 
       main.draw(Elements.main)
       return res()
    }

}