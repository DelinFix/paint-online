import { makeAutoObservable } from "mobx"

class CanvasState {
    canvas = null as unknown as HTMLCanvasElement
    socket = null as unknown as WebSocket
    sessionId = null as unknown as string
    undoList: string[] = []
    redoList: string[] = []
    username = ""

    constructor() {
        makeAutoObservable(this)
    }

    setUsername = (name: string) => {
        this.username = name
    }

    setSocket = (socket: WebSocket) => {
        this.socket = socket
    }

    setSessionId = (id: string = "") => {
        this.sessionId = id
    }

    setCanavas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    pushtoUndo(data: string) {
        this.undoList.push(data)
    }

    pushtoRedo(data: string) {
        this.redoList.push(data)
    }

    undo() {
        let ctx = this.canvas.getContext("2d")
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl || ""
            img.onload = () => {
                ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        let ctx = this.canvas.getContext("2d")
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl || ""
            img.onload = () => {
                ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()
