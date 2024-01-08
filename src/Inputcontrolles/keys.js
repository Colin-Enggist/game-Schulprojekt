// Class to manage Pointer controlles also made with the help from source video

export class Keys{
    static #input;

    static #event;
    static actiontypes=[
        
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