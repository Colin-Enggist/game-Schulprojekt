// Class managing displaying things on to the canvases and making them objects

import { Settings } from "./settings.js";
import { Pointer } from "./Inputcontrolles/pointer.js";

export class Element {

  constructor(type, name,pos,dim, actions, arr) {
    this.type = type;
    this.name = name;
    this.pos = pos;
    this.dim = dim;
    this.actions = actions; //need to implement boot up method
    this.display = []; // will be loaded in init function
    this.init(arr);
  }

  init(arr) {
    //preloading each display array element for faster loading
     this.loadDisplay(arr)
     return this.loadaction()
  }

  loadDisplay(arr){
    arr.forEach((el) => {
      // images treated differently in having the img property
      if (el.type === "image") {
        let image = new Image();
        image.src = el.url;

        // creating the object
        let obj = {
          type: el.type,
          img: image,
          url: el.url,
          x: (parseFloat(el.x) + parseFloat(this.pos.x)) * Settings.screenScaling,
          y: (parseFloat(el.y) + parseFloat(this.pos.y)) * Settings.screenScaling,
          w: el.w * Settings.screenScaling,
          maxw: el.maxw? el.maxw * Settings.screenScaling: undefined,
          h: (el.w / image.width) * image.height * Settings.screenScaling,
          r: el.r? el.r : undefined,
          size: el.size? el.size : undefined,
          color: el.color? el.color : undefined,
          text: el.text? el.text : undefined,
          composition: el.composition ? el.composition : false,
          comp: el.comp || undefined,
        };
        //pushin object in array
        return this.display.push(obj);
      }else{
        //creating normal object
        let obj = {
          type: el.type,
          x: (parseFloat(el.x) + parseFloat(this.pos.x)) * Settings.screenScaling,
          y: (parseFloat(el.y) + parseFloat(this.pos.y)) * Settings.screenScaling,
          w: el.w? el.w * Settings.screenScaling: undefined,
          maxw: el.maxw? el.maxw * Settings.screenScaling: undefined,
          h: el.h? el.h * Settings.screenScaling : undefined,
          r: el.r? el.r : undefined,
          size: el.size? el.size : undefined,
          color: el.color? el.color : undefined,
          text: el.text? el.text : undefined,
          composition: el.composition ? el.composition : false,
          comp: el.comp || undefined,
        };
        //pushing it in the array
        return this.display.push(obj);
      }
    });
  }

  loadaction(){
    Pointer.actiontypes.forEach((el)=>{
      this.actions?.forEach((ac)=>{
        if(el.type === ac.type){
          el.getattached({
            type:this.type,
            name:this.name,
            pos:this.pos,
            dim:this.dim,
            action:ac,
            display:this.display,
          });
          return
        }
      })
    })
  }
  
}

export class Elements{
  // gets all elemenst that the are visible in the current scene, loads them and stores them in respective arrays to their screen

  static #ui=[];
  static #bg=[];
  static #main=[];

  static get ui(){return this.#ui}
  static get bg(){return this.#bg}
  static get main(){return this.#main}


  static async fill(screen, array){
    let compute = await Promise.all(array.map(this.#load()));

    switch (screen){
      case "ui":
        compute.forEach((el)=>{
          this.#ui.push(el);
        })
      break;
      case "bg":
        compute.forEach((el)=>{
          this.#bg.push(el);
        })
      break;
      case "main":
        compute.forEach((el)=>{
          this.#main.push(el);
        })
      break;
      default:
        console.log("error: not a screen")
      break;
    }
  }

  static async#load(el){
    
    let compute = await this.#loadaction();

    let display = await Promise.all(compute.display.map(this.#loadDisplay));
    
    return new Promise((resolve)=>{
      let obj={
        type: el.type,
        name: el.name,
        pos : pos,
        dim : dim,
        actions : el.actions, 
        display : display
      }
      resolve(obj);
    })
  }

  static #loadDisplay(el){
      return new Promise((resolve)=>{
        if (el.type === "image") {
          let image = new Image();
          image.src = el.url;
          image.onload =()=>{
            // creating the object
            let obj = {
              type: el.type,
              img: image,
              url: el.url,
              x: (parseFloat(el.x) + parseFloat(this.pos.x)) * Settings.screenScaling,
              y: (parseFloat(el.y) + parseFloat(this.pos.y)) * Settings.screenScaling,
              w: el.w * Settings.screenScaling,
              maxw: el.maxw? el.maxw * Settings.screenScaling: undefined,
              h: (el.w / image.width) * image.height * Settings.screenScaling,
              r: el.r? el.r : undefined,
              size: el.size? el.size : undefined,
              color: el.color? el.color : undefined,
              text: el.text? el.text : undefined,
              composition: el.composition ? el.composition : false,
              comp: el.comp || undefined,
            };
            // resolving promise
            resolve(obj)
          }   
        }else{
          //creating normal object
          let obj = {
            type: el.type,
            x: (parseFloat(el.x) + parseFloat(this.pos.x)) * Settings.screenScaling,
            y: (parseFloat(el.y) + parseFloat(this.pos.y)) * Settings.screenScaling,
            w: el.w? el.w * Settings.screenScaling: undefined,
            maxw: el.maxw? el.maxw * Settings.screenScaling: undefined,
            h: el.h? el.h * Settings.screenScaling : undefined,
            r: el.r? el.r : undefined,
            size: el.size? el.size : undefined,
            color: el.color? el.color : undefined,
            text: el.text? el.text : undefined,
            composition: el.composition ? el.composition : false,
            comp: el.comp || undefined,
          };
            //resolving promise
            resolve(obj)
        }
      })
  }
  static async #loadaction(item){
    return new Promise((resolve)=>{
      Pointer.actiontypes.forEach((el)=>{
        item.actions?.forEach((ac)=>{
          if(el.type === ac.type){
            el.getattached({
              type: item.type,
              name: item.name,
              pos: item.pos,
              dim: item.dim,
              action: ac,
              display: item.display,
            });
          }
        })
      })
      resolve(item)
    })
    
  }
}