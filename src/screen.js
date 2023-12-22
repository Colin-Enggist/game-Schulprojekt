export class Screen{
    constructor(){
        this.setup();
    }

    setup= async ()=>{
        this.canvas =  document.getElementById("canvas");


        this.setScreenSize();
    }
    run(){
        console.log("running");
    }

    setScreenSize(){
        let w = window.innerWidth;
        let h = window.innerHeight;
        this.canvas.width = w; 
        this.canvas.height= h;
         

    }
}