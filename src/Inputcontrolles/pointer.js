// Class to manage Pointer controlles also made with the help from source video

export class Pointer{
    static #x;
    static #y;
    static #state;

    static #relation = document.getElementById('canvas').getBoundingClientRect();

    static init(){
        this.#x =0;
        this.#y=0;
        this.#state="";
        window.addEventListener('mousemove', this.mousemove);
        window.addEventListener('mousedown', this.mousedown);
        window.addEventListener('mouseup', this.mouseup);
    }

    static set pos({x,y}) { this.#x=x; this.#y=y;}
    static get pos() {return {x:this.#x, y:this.#y}}

    static set action(string){this.#state=string}
    static get action(){return {action:this.#state}}

    static mousemove = (e)=>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top};
        this.action = "mousemove";
    }

    static mousedown = (e) =>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top}
        this.action = "mousedown";
    }

    static mouseup = (e) =>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top}
        this.action = "mouseup";
    }

    static resetaction(){
        this.action = "";
    }
}