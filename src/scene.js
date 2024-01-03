// Controls the displayed scene and in generell the display made with the help from the source

import { Pointer } from "./Inputcontrolles/pointer.js";
import { Element} from "./element.js";
import { Settings } from "./settings.js";

export class Scene{
    constructor(scene){
        this.data= scene;
        this.setup();

        this.ui = scene.ui;

        this.bg = scene.bg;

        this.ent = scene.ent;
    }

    setup= async ()=>{
        //getting the canvases ready 
        this.screen =  document.getElementById("canvas");
        this.ui = document.getElementById("ui");
        this.bg = document.getElementById("bg");
        //pack them in an array and set each screensize
        let payload = [this.screen,this.ui,this.bg];
        this.setScreenSize(payload);


        return
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