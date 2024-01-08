//class to attach and listen for an event to occur
import { Pointer } from "../../Inputcontrolles/pointer.js";
import { Settings } from "../../settings.js";
import { Scene } from "../../scene.js";
import { Elements } from "../../element.js";


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
    //Use an array copy to not change original data in Settings.data.scenes. Yes I tested it, the only solution to copy Objects without reference is by using JSON.parse and Json.stringify ressource: https://dev.to/jorge_rockr/the-problem-with-array-cloning-in-javascript-and-how-to-solve-it-24gc

    const arr = JSON.parse(JSON.stringify(Settings.data.scenes))

    var target = Pointer.event.value;
    var s = Settings.data.index.indexOf("rockpaperscissor");
    let p;
    let c;

    const getPlayerFigure = () => {
      var i = arr[s].entitys.findIndex(
        (item) => item.name === target
      );

      let compute = arr[s].entitys[i];
      compute.pos = { x: "150", y: "365" };
      return compute
    };

    const getComFigure = () => {
      const comRng = () => {
        // I know that com has higher chance of winnig
        let rng = Math.floor(Math.random() * 3 + 1);
        let opt = ["rock", "paper", "scissor"];
        var d = opt.indexOf(target);
        opt.splice(d, 1);

        // so here are some measures to make the game more fair
        if (rng > opt.length) {
          var rnagain = Math.floor(Math.random() * 2 + 1);
          return opt[rnagain - 1];
        } else {
          return opt[rng - 1];
        }
      };
      // get alll necessary data
      var co = comRng();
      c = arr[s].entitys.findIndex(
        (item) => item.name === co
      );


      let compute = arr[s].entitys[c]
      compute.pos = { x: "710", y: "365" };
      return compute
    };

    const populateElements = (obj) => {
      const compute = {
        entitys: [],
      };
      compute.entitys.push(obj);
      // Populate Elements.main again
      console.log(compute)
      Elements.populate(compute, "main");
    };

    const updateDisplay = () => {
      return new Promise((resolve) => {
        // Update screen
        Scene.update(resolve);
      });
    };

    const getResult = ()=>{
      let text ={
        type:"text",name:"rpsresult",pos:{x:"340",y:"200"},dim:{w:"1080",h:"100"},
            actions:[

            ],
            display:[
                {type:"text",x:"0",y:"0",size:"80px",text:"Choose Game",maxw:"1080", color:"black"}
            ]
      }
      switch (p.name){
        case "rock":
          c.name == "paper"? text.display[0].text = "YOU LOSE": text.display[0].text = "YOU WIN";
        break;
        case "paper":
          c.name == "scissor"? text.display[0].text = "YOU LOSE": text.display[0].text = "YOU WIN";
        break;
        case "scissor":
          c.name == "rock"? text.display[0].text = "YOU LOSE": text.display[0].text = "YOU WIN";
        break;
      }
      return text
    }

    // PhaseOne
    await new Promise((resolve)=>{
      p = getPlayerFigure();
      console.log(p)
      //clear Elements.main
      Elements.clearMain();
      //start populating
      populateElements(p);
      updateDisplay()
      setTimeout(()=>{
        resolve()}
        ,1000)
    })


    //Phasetwo
    await new Promise((resolve)=>{
      c = getComFigure();
      populateElements(c)
      updateDisplay()
      resolve()
    })

    // end of game and Result
    await new Promise((resolve)=>{
      var t = getResult();
      populateElements(t)
      updateDisplay()
      setTimeout(()=>{
        resolve()}
        ,1000)
    })
   .then(()=>{
    //reload rockpaperscissor and reset event
    Pointer.resetaction();
    Scene.setup(Settings.data.scenes[s],resolve);
   })
  }

  static listener() {
    this.#attached.forEach((obj) => {
      if (
        Pointer.pos.x >= parseFloat(obj.pos.x) * Settings.screenScaling &&
        Pointer.pos.x <=
          (parseFloat(obj.pos.x) + parseFloat(obj.dim.w)) *
            Settings.screenScaling &&
        Pointer.pos.y >= parseFloat(obj.pos.y) * Settings.screenScaling &&
        Pointer.pos.y <=
          (parseFloat(obj.pos.y) + parseFloat(obj.dim.h)) *
            Settings.screenScaling
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
