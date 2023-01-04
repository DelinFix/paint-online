import Brush from "./Brush"

export default class Line extends Brush {
    mouseDown = false
    currentX = 0
    currentY = 0
    saved = ""

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.currentX = e.offsetX
        this.currentY = e.offsetY
        this.ctx?.beginPath()
        this.ctx?.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }

    draw(x: number, y: number) {
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
            this.ctx?.moveTo(this.currentX, this.currentY)
            this.ctx?.lineTo(x, y)
            this.ctx?.stroke()
        }
    }
}
