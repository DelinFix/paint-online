export default class Tool {
    canvas = null as unknown as HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null = null
    socket = null as unknown as WebSocket
    id = null as unknown as string

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext("2d")
        this.destroyEvents()
    }

    set fillColor(color: string) {
        this.ctx!.fillStyle = color
    }

    set strokeColor(color: string) {
        this.ctx!.strokeStyle = color
    }

    set lineWidth(width: number) {
        this.ctx!.lineWidth = width
    }

    destroyEvents() {
        this.canvas!.onmousemove = null
        this.canvas!.onmousedown = null
        this.canvas!.onmouseup = null
    }
}
