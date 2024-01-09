// Class to manage Pointer controlles also made with the help from source video
import Snake from "../actions/keys/snake/snake.js";
export class Keys{
    static #input;

    static #event;
    static actiontypes=[
        {type:"snake",eventlistener:"keydown",getattached:(obj)=>Snake.add(obj),resetattached:()=>Snake.removeAll()},
    ];


    static init(){
        this.#input = undefined;
        this.#event= {state:false,type:undefined,call:undefined,value:undefined};
        window.addEventListener('keydown', this.keydown)
        window.addEventListener('keypress', this.keypress)
        window.addEventListener('keyup', this.keyup)
    }

    static set input(val) {this.#input=val}
    static get input(){return this.#input}

    static set event(val) {this.#event=val}
    static get event() {return this.#event}

    static keydown = (e)=>{
        this.input= e.key

        Snake.listener()
    }

    static keypress = (e)=>{
        this.input= e.key
    }

    static keyup = (e)=>{
        this.input= e.key
    }
    
    static resetaction(){
        this.event = {state:false,type:undefined,call:undefined,value:undefined};
    }
}