
export class Pointer{
    static #x;
    static #y;

    static #relation = document.getElementById('canvas').getBoundingClientRect();

    static init(){
        this.#x =0;
        this.#y=0;
        window.addEventListener('mousemove', this.mousemove);
        window.addEventListener('mousedown', this.mousedown);
        window.addEventListener('mouseup', this.mouseup);
    }

    static set pos({x,y}) { this.#x=x; this.#y=y;}
    static get pos() {return {x:this.#x, y:this.#y}}

    static mousemove = (e)=>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top}
    }

    static mousedown = (e) =>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top}
    }

    static mouseup = (e) =>{
        this.pos = {x:e.clientX-this.#relation.left, y:e.clientY-this.#relation.top}
    }
}