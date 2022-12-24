import Rect from "./Rect"
import Tool from "./tool"

export default class Circle extends Rect {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            let currentX = e.offsetX
            let currentY = e.offsetY
            let width = currentX - this.startX
            let height = currentY - this.startY
            let r = Math.sqrt(width ** 2 + height ** 2)
            this.draw(this.startX, this.startY, r)
        }
    }

    draw(x: number, y: number, r: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = async () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(
                img,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            )
            this.ctx?.beginPath()
            this.ctx?.arc(x, y, r, 0, 2 * Math.PI)
            this.ctx?.fill()
            this.ctx?.stroke()
        }
    }
}
