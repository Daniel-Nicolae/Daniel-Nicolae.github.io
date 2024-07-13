import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import vision, { DrawingUtils, FaceLandmarker } from "@mediapipe/tasks-vision"
import createFaceLandmarker from "../utils/model"

interface Props {
    number: number
    ID: string
}

const IndividualCamera = ({number, ID}: Props) => {

    // checkbox handler
    const [active, setActive] = useState(false)
    const handleChange = () => {
        setActive(!active)
    }

    // face model loader
    const model = useRef<vision.FaceLandmarker>() as React.MutableRefObject<vision.FaceLandmarker>
    useEffect(() => {
        const loadModel = async () => {
            await createFaceLandmarker(model)
        }
        loadModel()
    })


    // model inference 
    let loop: number
    const landmarks = useRef<vision.NormalizedLandmark[]>()
    const handleVideoLoad = async (videoNode: SyntheticEvent) => {

        const video = videoNode.target as HTMLVideoElement
        if (video.readyState !== 4) return

        const canvasElement = document.getElementById("modelCanvas" + number) as HTMLCanvasElement

        canvasElement.setAttribute("width", "300")
        canvasElement.setAttribute("height", "300")

        const canvasCtx = canvasElement.getContext("2d")!
        const drawingUtils = new DrawingUtils(canvasCtx)

        loop = requestAnimationFrame(renderLoop)

        let lastVideoTime = -1
        function renderLoop() {
            
            let startTimeMs = performance.now()
            if (video.currentTime !== lastVideoTime) {

                // inference
                lastVideoTime = video.currentTime
                const faceLandmarkerResult = model.current.detectForVideo(video, startTimeMs)
                

                // drawing
                landmarks.current = faceLandmarkerResult.faceLandmarks[0]
                if (landmarks.current) {

                    canvasCtx.clearRect(0, 0, 300, 300)

                    drawingUtils.drawConnectors(
                        landmarks.current,
                        FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                        { color: "#000000", lineWidth: 1 }
                    )
                }
            }

            loop = requestAnimationFrame(renderLoop)
        }
    }


    return (
        <>
        <div style={{height: 5}}/>

        <div style={{display: "flex", flexDirection: "row", height: active ? 300 : 10, alignItems: "center"}}>
            <input
                type="checkbox"
                checked={active}
                onChange={handleChange}
            /> 

            <div style={{fontSize: 20}}> Camera {number} </div>
            

            <div style={{width: 40}}/>

            {active && 
            <Webcam
                id={"camera" + number} 
                videoConstraints={{
                    width: 700,
                    height: 700,
                    deviceId: ID
                }}
                style={{
                    width: 300
                }}
                onLoadedData={handleVideoLoad}
            />}

            {active && 
            <canvas id={"modelCanvas" + number}/>
            }

        </div>

        <div style={{height: 5}}/>
        </>
    )
}

export default IndividualCamera