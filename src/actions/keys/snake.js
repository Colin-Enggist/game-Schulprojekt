//class to attach and listen for an event to occur
import { Keys } from "../../Inputcontrolles/keys.js";
import { Elements } from "../../element.js";
import { main } from "../../screen.js";
import { Settings } from "../../settings.js";

export default class Snake {
  static #attached = [];
  static #index = [];

  static add(obj) {
    this.#attached.push(obj);
    this.#index.push(obj.name);
    this.bodys = [
      {
        type: "body",
        name: "snakebody",
        pos: { x: "200", y: "340" },
        dim: { w: "30", h: "30" },
        display: [
          { type: "circle", x: "15", y: "15", r: "15", color: "darkblue" },
        ],
      },
    ];
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

  static action(resolve) {
    // get an array copy to not modify Settings.data
    var s = Settings.data.index.indexOf("snake");
    const arr = JSON.parse(JSON.stringify(Settings.data.scenes[s].entitys));

    const newel = {
      entitys: [],
    };

    let head = this.#attached.find((el) => el.type === "player");

    const playerMove = (ent) => {
      switch (Keys.event.value) {
        case "forward":
          if (ent.type === "player") {
            var xn = parseInt(ent.pos.x);
            var yn = parseInt(ent.pos.y);
            ent.pos = { x: JSON.stringify(xn), y: JSON.stringify(yn - 5) };
            return playerturn(ent, "forward");
          } else if (ent.type === "body") {
            return bodysmove(ent);
          }
          break;
        case "back":
          if (ent.type === "player") {
            var xn = parseInt(ent.pos.x);
            var yn = parseInt(ent.pos.y);
            ent.pos = { x: JSON.stringify(xn), y: JSON.stringify(yn + 5) };
            return playerturn(ent, "back");
          } else if (ent.type === "body") {
            return bodysmove(ent);
          }
          break;
        case "right":
          if (ent.type === "player") {
            var xn = parseInt(ent.pos.x);
            var yn = parseInt(ent.pos.y);
            ent.pos = { x: JSON.stringify(xn + 5), y: JSON.stringify(yn) };
            return playerturn(ent, "right");
          } else if (ent.type === "body") {
            return bodysmove(ent);
          }
          break;
        case "left":
          if (ent.type === "player") {
            var xn = parseInt(ent.pos.x);
            var yn = parseInt(ent.pos.y);
            ent.pos = { x: JSON.stringify(xn - 5), y: JSON.stringify(yn) };
            return playerturn(ent, "left");
          } else if (ent.type === "body") {
            return bodysmove(ent);
          }
          break;
      }
    };

    const bodysmove = (body) => {
      var infrot = head.pos;


      if (parseInt(infrot.y) < parseInt(body.pos.y)) {
        var xn = parseInt(body.pos.x);
        var yn = parseInt(body.pos.y);
        return (body.pos = {
          x: JSON.stringify(xn),
          y: JSON.stringify(yn - 5),
        });
      }

      if (parseInt(infrot.x) < parseInt(body.pos.x)&& parseInt(infrot.y) == parseInt(body.pos.y)) {
        var xn = parseInt(body.pos.x);
        var yn = parseInt(body.pos.y);
        return (body.pos = {
          x: JSON.stringify(xn - 5),
          y: JSON.stringify(yn),
        });
      } 

      if (parseInt(infrot.x) > parseInt(body.pos.x)&& parseInt(infrot.y) == parseInt(body.pos.y)) {
        var xn = parseInt(body.pos.x);
        var yn = parseInt(body.pos.y);
        return (body.pos = {
          x: JSON.stringify(xn + 5),
          y: JSON.stringify(yn),
        });
      }

      if (parseInt(infrot.y) > parseInt(body.pos.y)&& parseInt(infrot.x) == parseInt(body.pos.x)) {
        var xn = parseInt(body.pos.x);
        var yn = parseInt(body.pos.y);
        return (body.pos = {
          x: JSON.stringify(xn),
          y: JSON.stringify(yn + 5),
        });
      }
      
      if (parseInt(infrot.x) > parseInt(body.pos.x)) {
        var xn = parseInt(body.pos.x);
        var yn = parseInt(body.pos.y);
        return (body.pos = {
          x: JSON.stringify(xn + 5),
          y: JSON.stringify(yn),
        });
      }

      
      
      

      


      /*
      switch (dir) {
        case "forward":
          if (parseInt(infrot.x) < parseInt(body.pos.x)) {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            return (body.pos = {
              x: JSON.stringify(xn - 5),
              y: JSON.stringify(yn),
            });
          }
          if (parseInt(infrot.x) > parseInt(body.pos.x)) {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            return (body.pos = {
              x: JSON.stringify(xn + 5),
              y: JSON.stringify(yn),
            });
          } else {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            body.pos = { x: JSON.stringify(xn), y: JSON.stringify(yn - 5) };
          }

          break;
        case "back":
          if (parseInt(infrot.x) < parseInt(body.pos.x)) {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            return (body.pos = {
              x: JSON.stringify(xn - 5),
              y: JSON.stringify(yn),
            });
          }
          if (parseInt(infrot.x) > parseInt(body.pos.x)) {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            return (body.pos = {
              x: JSON.stringify(xn + 5),
              y: JSON.stringify(yn),
            });
          } else {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            body.pos = { x: JSON.stringify(xn), y: JSON.stringify(yn + 5) };
          }
          break;
        case "right":
          if (parseInt(infrot.y) < parseInt(body.pos.y)) {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            return (body.pos = {
              x: JSON.stringify(xn),
              y: JSON.stringify(yn - 5),
            });
          }
          if (parseInt(infrot.y) > parseInt(body.pos.y)) {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            return (body.pos = {
              x: JSON.stringify(xn),
              y: JSON.stringify(yn + 5),
            });
          } else {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            body.pos = { x: JSON.stringify(xn + 5), y: JSON.stringify(yn) };
          }

          break;
        case "left":
          if (parseInt(infrot.y) < parseInt(body.pos.y)) {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            return (body.pos = {
              x: JSON.stringify(xn),
              y: JSON.stringify(yn - 5),
            });
          }
          if (parseInt(infrot.y) > parseInt(body.pos.y)) {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            return (body.pos = {
              x: JSON.stringify(xn),
              y: JSON.stringify(yn + 5),
            });
          } else {
            var xn = parseInt(body.pos.x);
            var yn = parseInt(body.pos.y);
            body.pos = { x: JSON.stringify(xn - 5), y: JSON.stringify(yn) };
          }
          break;
      }*/
    };

    const playerturn = (ent, dir) => {
      switch (dir) {
        case "forward":
          ent.display = [
            {
              type: "rect",
              x: "0",
              y: "0",
              w: "30",
              h: "30",
              color: "darkblue",
            },
            { type: "circle", x: "15", y: "0", r: "15", color: "darkblue" },
          ];

          break;
        case "back":
          ent.display = [
            {
              type: "rect",
              x: "0",
              y: "0",
              w: "30",
              h: "30",
              color: "darkblue",
            },
            {
              type: "circle",
              x: "15",
              y: "30",
              r: "15",
              color: "darkblue",
            },
          ];
          break;

        case "right":
          ent.display = [
            {
              type: "rect",
              x: "0",
              y: "0",
              w: "30",
              h: "30",
              color: "darkblue",
            },
            {
              type: "circle",
              x: "30",
              y: "15",
              r: "15",
              color: "darkblue",
            },
          ];

          break;
        case "left":
          ent.display = [
            {
              type: "rect",
              x: "0",
              y: "0",
              w: "30",
              h: "30",
              color: "darkblue",
            },
            { type: "circle", x: "0", y: "15", r: "15", color: "darkblue" },
          ];

          break;
      }
    };

    const updateElements = (elmain) => {
      this.#attached.forEach((el) => {
        if (elmain.name === el.name) {
          elmain.pos = el.pos;
          elmain.display = el.display;
          newel.entitys.push(elmain);
        }
      });
    };

    this.#attached.map(playerMove);
    arr.map(updateElements);
    Elements.clearMain();

    //prevent overloading this attached
    this.removeAll();

    Elements.populate(newel, "main");

    main.clear(0, 0, 1080, 720);

    new Promise((resolve) => {
      main.draw(Elements.main, resolve);
    });
    setTimeout(resolve, 25);
  }

  static listener() {
    // check for input that triggers action
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
