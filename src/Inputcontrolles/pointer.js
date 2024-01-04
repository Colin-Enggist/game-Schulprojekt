// Class to manage Pointer controlles also made with the help from source video
import Scenechange from "../actions/pointer/scenechange.js";
export class Pointer{
    static #x;
    static #y;

    static #event;

    static #relation = document.getElementById('canvas').getBoundingClientRect();

    static init(){
        this.#x =0;
        this.#y=0;
        this.#event= false;
        window.addEventListener('mousemove', this.mousemove);
        window.addEventListener('mousedown', this.mousedown);
        window.addEventListener('mouseup', this.mouseup);
    }

    static set pos({x,y}) { this.#x=x; this.#y=y;}
    static get pos() {return {x:this.#x, y:this.#y}}

    static set event(val) {this.#event=val}
    static get event() {return this.#event}

    static mousemove = (e)=>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top};

    }

    static mousedown = (e) =>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top}

        Scenechange.listener();
        
    }

    static mouseup = (e) =>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top}
        
    }

    static resetaction(){
        this.state = {action:null,value:undefined};
    }
}