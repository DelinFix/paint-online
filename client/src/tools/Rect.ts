import Tool from "./Tool"

export default class Rect extends Tool {
    mouseDown = false
    startX = 0
    startY = 0
    saved = ""
    width = 0
    height = 0

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler() {
        this.mouseDown = false
        this.socket.send(
            JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: "rect",
                    x: this.startX,
                    y: this.startY,
                    width: this.width,
                    height: this.height,
                    color: this.ctx?.fillStyle,
                },
            })
        )
        this.socket.send(
            JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: "finish",
                },
            })
        )
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
            this.width = currentX - this.startX
            this.height = currentY - this.startY
            this.draw(this.startX, this.startY, this.width, this.height)
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

    static staticDraw(
        ctx: CanvasRenderingContext2D | null,
        x: number,
        y: number,
        w: number,
        h: number,
        color: string
    ) {
        ctx!.fillStyle = color
        ctx?.beginPath()
        ctx?.rect(x, y, w, h)
        ctx?.fill()
        ctx?.stroke()
    }
}
