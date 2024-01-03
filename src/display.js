// Class managing displaying things on to the canvas


export class Display{
    static #canvas=  document.getElementById("canvas");
    static #ctx = this.#canvas.getContext("2d");

    static draw(arr){
        arr.forEach((draw)=>{
            switch(draw.type){
                case "rect":
                    this.rect(draw.x,draw.y,draw.w,draw.h,draw.color);
                break;
                case "circle":
                    this.circle(draw.x,draw.y,draw.r,draw.color)
                break;
                case "image":
                    this.image(draw.x,draw.y,draw.w,draw.url)
                break;
                case "text":
                    this.text(draw.x,draw.y,draw.size,draw.text)
                break;
                }
            }
        )
    }

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

    static text(x,y,size,text){
        this.#ctx.font = size +" helvetica";
        this.#ctx.fillText(text,x,y);
    }

}