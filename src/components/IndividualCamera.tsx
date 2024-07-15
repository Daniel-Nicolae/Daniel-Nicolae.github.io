import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import vision, { DrawingUtils, FaceLandmarker } from "@mediapipe/tasks-vision"
import createFaceLandmarker from "../utils/model"

interface Props {
    number: number
    ID: string
    landmarksRef: React.MutableRefObject<vision.NormalizedLandmark[]>
}

const IndividualCamera = ({number, ID, landmarksRef}: Props) => {

    // checkbox handler
    const [active, setActive] = useState(false)
    const handleChange = () => {
        setActive(!active)
    }

    // face model loader
    const model = useRef<vision.FaceLandmarker>() as React.MutableRefObject<vision.FaceLandmarker>
    useEffect(() => {
        createFaceLandmarker(model)

        return () => {cancelAnimationFrame(loop)}
    })


    // model inference 
    let loop: number
    const handleVideoLoad = async (videoNode: SyntheticEvent) => {

        const video = videoNode.target as HTMLVideoElement
        if (video.readyState !== 4) return

        const canvasElement = document.getElementById("modelCanvas" + number) as HTMLCanvasElement

        canvasElement.setAttribute("width", "300")
        canvasElement.setAttribute("height", "300")

        const canvasCtx = canvasElement.getContext("2d")!
        const drawingUtils = new DrawingUtils(canvasCtx)

        let lastVideoTime = -1
        loop = requestAnimationFrame(renderLoop)
        function renderLoop() {
            
            let startTimeMs = performance.now()
            if (video.currentTime !== lastVideoTime) {

                // inference
                lastVideoTime = video.currentTime
                const faceLandmarkerResult = model.current.detectForVideo(video, startTimeMs)
                

                // drawing
                landmarksRef.current = faceLandmarkerResult.faceLandmarks[0]
                if (landmarksRef.current) {

                    canvasCtx.clearRect(0, 0, 300, 300)

                    drawingUtils.drawConnectors(
                        landmarksRef.current,
                        FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                        { color: "#000000", lineWidth: 0.6 }
                    )
                    drawingUtils.drawLandmarks([landmarksRef.current[168], landmarksRef.current[2], 
                                                landmarksRef.current[229], landmarksRef.current[28], 
                                                landmarksRef.current[449], landmarksRef.current[258], 
                                                // landmarksRef.current[137], landmarksRef.current[93],
                                                // landmarksRef.current[366], landmarksRef.current[323]
                                                ],
                                                {radius: 4, lineWidth: 2, fillColor: "#FFFFFF", color: "#0022AA"}
                                            )
                }
                else canvasCtx.clearRect(0, 0, 300, 300)
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
            <div style={{position: "relative", height: active ? 300 : 10}}>
                <Webcam
                    id={"camera" + number} 
                    videoConstraints={{
                        width: 700,
                        height: 700,
                        deviceId: ID
                    }}
                    style={{
                        position: "absolute",
                        top: 0, left: 0,
                        width: 300
                    }}
                    onLoadedData={handleVideoLoad}/>

                <canvas 
                    id={"modelCanvas" + number}
                    style={{
                        position: "absolute",
                        top: 0, left: 0
                    }}/>
                
            </div>}

        </div>

        <div style={{height: 5}}/>
        </>
    )
}

export default IndividualCamera