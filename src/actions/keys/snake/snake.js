//class to attach and listen for an event to occur
import { Keys } from "../../../Inputcontrolles/keys.js";
import { Elements } from "../../../element.js";
import { main } from "../../../screen.js";
import { Settings } from "../../../settings.js";

export default class Snake {
  static #attached = [];
  static #index = [];
  static head;
  static body = [];
  static points;
  static food;
  static isInit = false;
  static hasFood = false;

  //adding elements with respective actions to this.#attached
  static add(obj) {
    //Find this scene and all it's Data in Settings.data
    var i = Settings.data.index.indexOf("snake");
    // make an array copy without reference to the objects in the Original Array. Otherwise changes on objects also Mutates the Data in Settings.data
    const arr = JSON.parse(JSON.stringify(Settings.data.scenes[i]));

    // Set initial Points
    this.points = 0;

    // Push Elements in this.#attached
    this.#attached.push(obj);

    // get an reference array for each obj name, (This is an unnecessary step and will be removed in the future)
    this.#index.push(obj.name);

    if (this.isInit === false) {
      // get a playerfigure or snakehead copy that this class uses for better performance
      this.head = arr.entitys.find((el) => (el.type = "player"));
      // remove it's original actions as otherwise this.#attached would get overfilled each iteration
      this.head.actions = [];

      // get a body of the snake from Settings.data for the same reasons as before
      this.body = arr.entitys.filter((el) => el.type === "body");
      // remove the original actions as otherwise this.#attached would get overfilled each iteration
      this.body.forEach((el) => (el.actions = []));

      // the same thing for the goal Element.
      this.food = arr.entitys.find((el) => el.type === "goal");
      this.food.actions = [];

      // return this.isInit = true so this won't be called each time this.add() gets called
      return (this.isInit = true);
    }
  }

  //Remove an Element from this.#attached by it's name
  static removebyname(name) {
    //find the right index for removal and safe it in c
    var c = this.#index.indexOf(name);
    //check if anything is found and when there is something delete one entry at index c
    c = -1
      ? console.log("error no element found")
      : this.#attached.splice(c, 1);
  }

  //remove all Elements from this.#attached and this.#index
  static removeAll() {
    this.#attached.splice(0, this.#attached.length);
    this.#index.splice(0, this.#index.length);
    return;
  }

  // method called when when an event triggers this action
  static async action(resolve) {
    // compute will store the updated Elements that need to be displayed on the canvas.
    const compute = {
      entitys: [],
    };

    // this function handles how the player moves
    const playrmove = () => {
      switch (Keys.event.value) {
        case "forward":
          this.head.pos.y = parseInt(this.head.pos.y) - 15;
          // Correct the model of the snakehead so it faces the direction it's going
          this.head.display = [
            {
              type: "rect",
              x: "0",
              y: "0",
              w: "30",
              h: "15",
              color: "black",
            },
            { type: "circle", x: "15", y: "0", r: "15", color: "black" },
          ];
          //first body elements gets old player position
          this.body[0].pos = { x: this.head.pos.x , y: this.head.pos.y};
          this.body.forEach((el) => (el.pos.y += 15));
          var c = this.body[0];
          bodysmove(c,0,15);
          break;
        case "back":
          this.head.pos.y = parseInt(this.head.pos.y) + 15;
          this.head.display = [
            {
              type: "rect",
              x: "0",
              y: "0",
              w: "30",
              h: "15",
              color: "black",
            },
            { type: "circle", x: "15", y: "15", r: "15", color: "black" },
          ];
          // I don't know why but I need to subtract the -15 on this body element otherwise it gets hidden inside the snakehead
          this.body[0].pos = { x: this.head.pos.x, y: this.head.pos.y - 15 };
          this.body.forEach((el) => (el.pos.y += -15));
          var c = this.body[0];
          bodysmove(c,0,-15);
          break;
        case "right":
          this.head.pos.x = parseInt(this.head.pos.x) + 15;
          this.head.display = [
            {
              type: "rect",
              x: "0",
              y: "0",
              w: "15",
              h: "30",
              color: "black",
            },
            { type: "circle", x: "15", y: "15", r: "15", color: "black" },
          ];
          this.body[0].pos = { x: this.head.pos.x - 15, y: this.head.pos.y };
          // I don't know why but I need to subtract the -15 on this body element otherwise it gets hidden inside the snakehead
          var c = this.body[0];
          this.body.forEach((el) => (el.pos.x += -15));
          bodysmove(c,-15,0);
          break;
        case "left":
          this.head.pos.x = parseInt(this.head.pos.x) - 15;
          this.head.display = [
            {
              type: "rect",
              x: "0",
              y: "0",
              w: "15",
              h: "30",
              color: "black",
            },
            { type: "circle", x: "0", y: "15", r: "15", color: "black" },
          ];
          this.body[0].pos = { x: this.head.pos.x, y: this.head.pos.y };
          this.body.forEach((el) => (el.pos.x += 15));
          var c = this.body[0];
          bodysmove(c,15,0);
          break;
      }
      // push Elements inside compute
      compute.entitys.push(this.head);
    };

    //handling the movement of each body element
    const bodysmove = (firstBody, numx, numy) => {
      //this.body.forEach((el) => (el.pos.x += numx));
      //this.body.forEach((el) => (el.pos.y += numy));
     
      for (var i = 0; i < this.body.length - 1; i++) {
        this.body[i] = this.body[i + 1];
      }
      // every element adds the space they have between other elements
      
      if(checkforpoint()){
        var el = JSON.parse(JSON.stringify(this.body.pop())) 
        
        this.body.push(el);
        this.body.push(firstBody);
        
        
        return compute.entitys.push(...this.body);
      }else{
        this.body.pop();
        
        this.body.push(firstBody);
        return compute.entitys.push(...this.body);
      }

      
    };

    const checkforpoint=()=>{

      if (
        //checkforpoint
          this.head.pos.x <= this.food.pos.x + 25 &&
          this.head.pos.y <= this.food.pos.y + 25 &&
          this.head.pos.x >= this.food.pos.x - 25 &&
          this.head.pos.y >= this.food.pos.y - 25
      ) {
        //if a point is made give add points
        console.log("eaten");
        this.points += 10;
        this.hasFood = false;
        return true
      } else{
        // otherwise remove the last element of the array
        return false
      }
    }

    

    //get a rondom x and y coordinate
    const randomPos = () => {
      let w = document.getElementById("main").clientWidth;
      let h = document.getElementById("main").clientHeight;

      return {
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h),
      };
    };

    // generate the food element
    const getFood = () => {
    
      if (this.hasFood === false) {
        var rpos = randomPos();

        this.food.pos = { x: rpos.x, y: rpos.y };
        this.hasFood = true;
        console.log(this.food);
        return compute.entitys.push(this.food);
      } else {
        return compute.entitys.push(this.food);
      }
    };

    
    // check for collisions
    const checkCollision = () => {
      const head = this.head.pos;
      /* this.canvas.width = 1080 * Settings.screenScaling;
    this.canvas.height = 720 * Settings.screenScaling;*/
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= 1080 * Settings.screenScaling ||
        head.y >= 720 * Settings.screenScaling ||
        this.body.some(
          (segment) => segment.pos.x === head.x && segment.pos.y === head.y
        )
      ) {
        return true;
      }
      return false;
    };

    //game Over screen
    const gameOver = () => {
      alert("Game Over! Your Score: " + this.points);
    };

    await new Promise((resolve) => {
      playrmove();
      if (checkCollision()) {
        return gameOver();
      }
      getFood();
      // clear old elements and populate the new
      Elements.clearMain();
      Elements.populate(compute, "main");
      setTimeout(resolve, 29);
    });


    main.clear(0, 0, 1080, 720);
    main.draw(Elements.main, resolve);
  }

  // the listener, watcher or conditions for this action to trigger
  static listener() {
    // code that handles when and how an event happens
    switch (Keys.input) {
      case "w":
        Keys.event = {
          state: true,
          execution: "scene",
          type: "snake",
          call: (value) => this.action(value),
          value: "forward",
        };
        break;
      case "a":
        Keys.event = {
          state: true,
          execution: "scene",
          type: "snake",
          call: (value) => this.action(value),
          value: "left",
        };
        break;
      case "d":
        Keys.event = {
          state: true,
          execution: "scene",
          type: "snake",
          call: (value) => this.action(value),
          value: "right",
        };
        break;
      case "s":
        Keys.event = {
          state: true,
          execution: "scene",
          type: "snake",
          call: (value) => this.action(value),
          value: "back",
        };
        break;
    }
  }
}
