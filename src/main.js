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

    this.loadscenes("boot");

    // return with starting the loop
    return this.run();
  }

  loadscenes(sceneIndex) {
    //loading a new scene
    if (sceneIndex === "boot") {
      this.currentscene = 0;
      Scene.setup(Settings.data.scenes[this.currentscene]);
      return;
    } else {
      this.currentscene = this.reference.indexOf(sceneIndex);
      this.currentscene === -1
        ? console.log("Error: scene not found")
        : Scene.setup(Settings.data.sences[this.currentscene]);
      return;
    }
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

  engineevents(event) {
    switch (event.type) {
      case "scenechange":
        this.loadscenes(event.value);

        break;
    }
    Pointer.resetaction();
    return;
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
          resolve();
        } else {
          event.action(resolve)
        }
      });
      //Promise for drawing and displaying everything will be added soon
      const displaypromise = await new Promise((resolve)=>{
            Scene.newframe(resolve)
      })

      // Waiting for all Promises to be fullfilled before starting a new loop
      await Promise.all([timePromise, eventpromise,displaypromise]).then(() => {
        return requestAnimationFrame(this.run);
      });
    } catch (err) {
      console.log(err);
    }
  };
}

window.addEventListener("DOMContentLoaded", () => {
  new Engine();
});
