//class to attach and listen for an event to occur
import { Pointer } from "../../Inputcontrolles/pointer.js";
import { Settings } from "../../settings.js";
import { Scene } from "../../scene.js";
import { Elements } from "../../element.js";
import { main } from "../../screen.js";

export default class Rockpaperscissor {
  static #attached = [];
  static #index = [];

  static add(obj) {
    this.#attached.push(obj);
    this.#index.push(obj.name);
    return;
  }

  static removebyname(name) {
    //find the right index for removal and safe it in c
    var c = this.#index.indexOf(name);
    //check if anything is found and when ther is something delete one entry at index c
    c = -1
      ? console.log("error no element found")
      : this.#attached.splice(c, 1);
  }

  static removeAll() {
    this.#attached.splice(0, this.#attached.length);
    this.#index.splice(0, this.#index.length);
    return;
  }

  static async action(resolve) {
    const target = Pointer.event.value;
    const data={
      entitys:[]
    };

    await new Promise((resolve)=>{
      //get player figure
      
      var s = Settings.data.index.indexOf('rockpaperscissor')
      var i = Settings.data.scenes[s].entitys.findIndex((item)=>item.name===target);

      data.entitys.push(Settings.data.scenes[s].entitys[i])
      data.entitys[0].pos= {x:"150", y:"315"}

      //get Com figure

      const comFigure=()=>{
        // I know that com has higher chance of winnig

        let rng = Math.floor(Math.random()* 3 + 1)
        let opt= ['rock','paper','scissor']
        var d = opt.indexOf(target)
        opt.splice(d,1);

        // some measures against the better ods for the com
        if(rng > opt.length){
          var rnagain= Math.floor(Math.random()*2+1)
          console.log("test")
          return opt[rnagain-1]
        }else{
          return opt[rng-1]
        }
      }
      var co= comFigure()
      var c = Settings.data.scenes[s].entitys.findIndex((item)=>item.name===co);
      data.entitys.push(Settings.data.scenes[s].entitys[c])
      data.entitys[1].pos= {x:"710", y:"315"}
      console.log(data.entitys[1])
      
      
      
    
      //clear Elements.main
      Elements.clearMain();
      
      // Populate Elements.main again
      Elements.populate(data,"main")

      //Reset event
      Pointer.resetaction();
      
      // Update screen
      Scene.update(resolve)
      
      //resolve()
    })
    const phaseOne= await new Promise((resolve)=>{
      Pointer.resetaction();

      Scene.update(resolve)
      Scene.update(resolve)
    })
     
   
    resolve()
  }

  static listener() {
    this.#attached.forEach((obj) => {
      if (
        Pointer.pos.x >= parseFloat(obj.pos.x) * Settings.screenScaling &&
        Pointer.pos.x <= (parseFloat(obj.pos.x) + parseFloat(obj.dim.w)) * Settings.screenScaling &&
        Pointer.pos.y >= parseFloat(obj.pos.y) * Settings.screenScaling &&
        Pointer.pos.y <= (parseFloat(obj.pos.y) + parseFloat(obj.dim.h)) * Settings.screenScaling
      ) {
        return (Pointer.event = {
          state: true,
          execution: "scene",
          type: "rockpaperscissor",
          call: (value) => this.action(value),
          value: obj.action.value,
        });
      }
    });
  }
}
