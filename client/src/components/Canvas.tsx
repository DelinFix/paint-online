import { observer } from "mobx-react-lite"
import "../styles/canvas.scss"
import { useEffect, useRef, useState } from "react"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"
import { Modal } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import { useParams } from "react-router-dom"

const Canvas = () => {
    const canvasRef = useRef(null as unknown as HTMLCanvasElement)
    const usernameRef = useRef(null as unknown as HTMLInputElement)
    const [isModalActive, setIsModalActive] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanavas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket("ws://localhost:5000/")
            socket.onopen = () => {
                console.log("Подключение установлено")
                socket.send(
                    JSON.stringify({
                        id: params.id,
                        username: canvasState.username,
                        method: "connection",
                    })
                )
            }
            socket.onmessage = (MsgEvent) => {
                console.log(MsgEvent)
            }
        }
    }, [canvasState.username])

    const mouseDownHandler = () => {
        canvasState.pushtoUndo(canvasRef.current.toDataURL())
    }

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setIsModalActive(false)
    }

    return (
        <div className="canvas">
            <Modal show={isModalActive} onHide={() => null}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите имя:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={connectionHandler}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas
                onMouseDown={() => mouseDownHandler()}
                ref={canvasRef}
                width={600}
                height={400}
            />
        </div>
    )
}

export default observer(Canvas)
