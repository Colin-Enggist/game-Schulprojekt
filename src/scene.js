// Controls the displayed scene and in generell the display made with the help from the source

import { Pointer } from "./Inputcontrolles/pointer.js";
import { Element} from "./element.js";
import { Settings } from "./settings.js";

export class Scene{
    constructor(scene){
        this.uiEl=[];
        this.bgEl=[];
        this.entEl=[];
        this.data= scene;
        this.setup()
        .then(()=>this.preloadElements())
        .then(()=>{this.displayEl()})

        
    }

    setup= async ()=>{
        //getting the canvases ready 
        this.screen =  document.getElementById("canvas");
        this.ui = document.getElementById("ui");
        this.bg = document.getElementById("bg");
        //pack them in an array and set each screensize
        let payload = [this.screen,this.ui,this.bg];
        this.setScreenSize(payload);
        // getting context
        this.ctxui= this.ui.getContext("2d");
        this.ctxbg= this.bg.getContext("2d");
        this.ctxent= this.screen.getContext("2d");
        return
    }

    preloadElements(){
        this.data.ui.forEach((item)=>{
          this.uiEl.push(new Element(item.type,item.name, this.ctxui,item.actions,item.display));
        })

        this.data.bg.forEach((item)=>{
            this.bgEl.push(new Element(item.type,item.name,this.ctxbg,item.actions,item.display))
        })
    }

    displayEl(){
        this.uiEl.forEach((item)=>item.draw())
        this.bgEl.forEach((item)=>item.draw())
    }


    run(){
        console.log(Pointer.pos) 
        Pointer.pos;
        Settings.data.scenes[0].entitys.forEach((obj)=>{
            Display.draw(obj.display)
        })
        
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