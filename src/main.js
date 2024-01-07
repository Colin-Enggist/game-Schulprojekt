//The Main engine coded from the source mentioned

import { Pointer } from "./Inputcontrolles/pointer.js";
import { Scene } from "./scene.js";
import { Settings } from "./settings.js";

class Engine {
  constructor() {
    this.boot();
  }

  async boot() {
    //make the fetch request to get all data for every game object from data.json and some other operations
    await fetch("./data/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => (Settings.data = data))
      .then((this.previousTime = Date.now()))
      .then(Pointer.init())
      .then(() => {
        this.reference = Settings.data.index;
      });
      await new Promise((resolve)=>{
        Scene.setup(Settings.data.scenes[2],resolve);
      }).then(this.run)
      
    // return with starting the loop
    return 
  }

  input() {
    Pointer.pos;
    Pointer.event;
    if (Pointer.event.state) {
      return Pointer.event;
    } else {
      return { state: false, type: undefined };
    }
  }

  run = async () => {
    try {
        console.log("run")
    // promise for every function regarding setting the new time
      const timePromise = await new Promise((resolve) => {
        let newTime = Date.now();
        Settings.dt = (newTime - this.previousTime) / 1000;
        this.previousTime = newTime;
        resolve()
      });
    // Promise regarding eventhandling
      const eventpromise = await new Promise((resolve) => {
        var event = this.input();
        if (event.state == false) {
          return resolve();
        } else {
          return event.call(resolve)
        }
      });
      //Promise for drawing and displaying everything will be added soon
      

      // Waiting for all Promises to be fullfilled before starting a new loop
      await Promise.all([timePromise, eventpromise])
      .then(() => {
        new Promise((resolve)=>{
          Scene.newframe(resolve)
        }).then(()=>{return requestAnimationFrame(this.run);})
      })
    } catch (err) {
      console.log(err);
    }
  };
}

window.addEventListener("DOMContentLoaded", () => {
  new Engine();
});
