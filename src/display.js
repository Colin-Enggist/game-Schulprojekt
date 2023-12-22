// Class managing displaying things on to the canvas


export class Display{
    static #canvas=  document.getElementById("canvas");
    static #ctx = this.#canvas.getContext("2d");

    static rect(x, y, w, h, color){
        this.#ctx.fillStyle= color;
        this.#ctx.fillRect(x,y,w,h);
    }

    static circle(x, y, r, color){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle= color;
        ctx.fill();
    }

    static clear(x,y,w,h){
        this.#ctx.clearRect(x,y,w,h);
    }

    static image(x, y, w, url){
        let img = new Image;
        img.src= url;
        let h = (w / img.width )* img.height;

        img.onload = async()=>{
           await this.#ctx.drawImage(img, x, y, w, h);
        }
    }

}