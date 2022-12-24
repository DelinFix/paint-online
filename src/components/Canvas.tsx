import { observer } from "mobx-react-lite"
import "../styles/canvas.scss"
import { useEffect, useRef } from "react"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"

const Canvas = () => {
    const canvasRef = useRef(null as unknown as HTMLCanvasElement)

    useEffect(() => {
        canvasState.setCanavas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={600} height={400} />
        </div>
    )
}

export default observer(Canvas)
