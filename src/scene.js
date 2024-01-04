// Controls the displayed scene and in generell the display made with the help from the source

import { Element} from "./element.js";
import { Settings } from "./settings.js";

export class Scene{
    constructor(data){
        this.data= data;
        this.screens={
            main: document.getElementById("canvas"),
            ui: document.getElementById("ui"),
            bg: document.getElementById("bg")
        }
        this.ctx={
            main: this.screens.main.getContext("2d"),
            ui: this.screens.ui.getContext("2d"),
            bg: this.screens.bg.getContext("2d")
        }
    }

    setup= async ()=>{
        this.setScreenSize([this.screens.main,this.screens.ui,this.screens.bg]);
        await this.preloadElements(this.data)
        return this.displayEl()
    }

    async preloadElements(data){
        this.uiEl=[];
        await data.ui.forEach((item)=>{
          this.uiEl.push(new Element(item.type,item.name, this.ctx.ui,item.actions,item.display));
        })

        this.bgEl=[];
        await data.bg.forEach((item)=>{
            this.bgEl.push(new Element(item.type,item.name,this.ctx.bg,item.actions,item.display))
        })

        this.entEl=[];
        await data.entitys.forEach((item)=>{
            this.entEl.push(new Element(item.type,item.name,this.ctx.main,item.actions,item.display))})

        return
    }

    displayEl(){
        this.uiEl.forEach((item)=> item.draw())
        this.bgEl.forEach((item)=>item.draw())
        this.entEl.forEach((item)=>item.draw())
    }


    run(){
        this.entEl.forEach((item)=>{item.draw()})
    }


    setScreenSize(payload){
        //getting the scaling value if the canvases can't be displayed properly
        let c = window.innerWidth;
        Settings.screenScaling = c/1080;

        //setting an upper limit
        if(Settings.screenScaling >1){
            Settings.screenScaling = 1;
        }
        //looping through each canvas to get the right height and width
        payload.forEach((load)=>{
            load.width = 1080*Settings.screenScaling;
            load.height = 720*Settings.screenScaling;
        })
    }
}