import { makeAutoObservable } from "mobx"

class CanvasState {
    canvas = null as unknown as HTMLCanvasElement

    constructor() {
        makeAutoObservable(this)
    }

    setCanavas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }
}

export default new CanvasState()
