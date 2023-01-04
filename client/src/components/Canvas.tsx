import { observer } from "mobx-react-lite"
import "../styles/canvas.scss"
import { useEffect, useRef, useState } from "react"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"
import { Modal } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import { useParams } from "react-router-dom"
import Rect from "../tools/Rect"

const Canvas = () => {
    const canvasRef = useRef(null as unknown as HTMLCanvasElement)
    const usernameRef = useRef(null as unknown as HTMLInputElement)
    const [isModalActive, setIsModalActive] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanavas(canvasRef.current)
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket("ws://localhost:5000/")
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(
                new Brush(canvasRef.current, socket, params.id || "")
            )
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
                let msg = JSON.parse(MsgEvent.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`Пользователь ${msg.username} подключен`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg: any) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext("2d")
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.width,
                    figure.height
                )
                break
            case "finish":
                ctx?.beginPath()
                break
        }
    }

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
