import Tool from "./tool"

export default class Rect extends Tool {
    mouseDown = false
    startX = 0
    startY = 0
    saved = ""

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx?.beginPath()
        this.startX = e.offsetX
        this.startY = e.offsetY
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            let currentX = e.offsetX
            let currentY = e.offsetY
            let width = currentX - this.startX
            let height = currentY - this.startY
            this.draw(this.startX, this.startY, width, height)
        }
    }

    draw(x: number, y: number, w: number, h: number) {
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
            this.ctx?.rect(x, y, w, h)
            this.ctx?.fill()
            this.ctx?.stroke()
        }
        this.ctx?.rect(x, y, w, h)
        this.ctx?.fill()
        this.ctx?.stroke()
    }
}
