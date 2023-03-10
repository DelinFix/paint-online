import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import "../styles/toolbar.scss"
import Brush from "../tools/Brush"
import Circle from "../tools/Circle"
import Eraser from "../tools/Eraser"
import Line from "../tools/Line"
import Rect from "../tools/Rect"

const Toolbar = () => {
    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        const aTeg = document.createElement("a")
        aTeg.href = dataUrl
        aTeg.download = canvasState.sessionId + ".jpg"
        document.body.appendChild(aTeg)
        aTeg.click()
        document.body.removeChild(aTeg)
    }

    return (
        <div className="toolbar">
            <button
                className="toolbar__btn brush"
                onClick={() =>
                    toolState.setTool(
                        new Brush(
                            canvasState.canvas,
                            canvasState.socket,
                            canvasState.sessionId
                        )
                    )
                }
            />
            <button
                className="toolbar__btn rect"
                onClick={() =>
                    toolState.setTool(
                        new Rect(
                            canvasState.canvas,
                            canvasState.socket,
                            canvasState.sessionId
                        )
                    )
                }
            />
            <button
                className="toolbar__btn circle"
                onClick={() =>
                    toolState.setTool(new Circle(canvasState.canvas))
                }
            />
            <button
                className="toolbar__btn eraser"
                onClick={() =>
                    toolState.setTool(new Eraser(canvasState.canvas))
                }
            />
            <button
                className="toolbar__btn line"
                onClick={() =>
                    toolState.setTool(
                        new Line(
                            canvasState.canvas,
                            canvasState.socket,
                            canvasState.sessionId
                        )
                    )
                }
            />
            <input
                onChange={changeColor}
                type="color"
                className="color-input"
            />
            <button
                className="toolbar__btn undo"
                onClick={() => canvasState.undo()}
            />
            <button
                className="toolbar__btn redo"
                onClick={() => canvasState.redo()}
            />
            <button className="toolbar__btn save" onClick={download} />
        </div>
    )
}

export default Toolbar
