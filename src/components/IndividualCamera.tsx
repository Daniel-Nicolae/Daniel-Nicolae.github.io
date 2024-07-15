import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import vision, { DrawingUtils, FaceLandmarker } from "@mediapipe/tasks-vision"
import createFaceLandmarker from "../utils/model"
import { cameraSize, videoSize, usefulLandmarksIDs } from "../utils/config"

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

        canvasElement.setAttribute("width", "" + cameraSize)
        canvasElement.setAttribute("height", "" + cameraSize)

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
                if (faceLandmarkerResult.faceLandmarks[0]) {

                    // extract useful landmarks only and save in ref
                    const usefulLandmarks: vision.NormalizedLandmark[] = []
                    faceLandmarkerResult.faceLandmarks[0].map(
                        (value, index) => {
                            if (usefulLandmarksIDs.includes(index)) 
                                usefulLandmarks.push(value)})
                    landmarksRef.current = usefulLandmarks

                    // draw face mesh
                    canvasCtx.clearRect(0, 0, cameraSize, cameraSize)
                    drawingUtils.drawConnectors(
                        faceLandmarkerResult.faceLandmarks[0],
                        FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                        { color: "#000000", lineWidth: 0.6 })

                    // draw useful landmarks
                    drawingUtils.drawLandmarks(usefulLandmarks,
                                            {radius: 4, lineWidth: 2, 
                                            fillColor: "#FFFFFF", color: "#0022AA"})
                }
                else {
                    landmarksRef.current = []
                    canvasCtx.clearRect(0, 0, cameraSize, cameraSize)
                }
            }

            loop = requestAnimationFrame(renderLoop)
        }
    }


    return (
        <>
        <div style={{height: 5}}/>

        <div style={{display: "flex", flexDirection: "row", height: active ? cameraSize : 10, alignItems: "center"}}>
            <input
                type="checkbox"
                checked={active}
                onChange={handleChange}
            /> 

            <div style={{fontSize: 20}}> Camera {number} </div> 
            

            <div style={{width: 40}}/>

            {active && 
            <div style={{position: "relative", height: active ? cameraSize : 10}}>
                <Webcam
                    id={"camera" + number} 
                    videoConstraints={{
                        width: videoSize,
                        height: videoSize,
                        deviceId: ID
                    }}
                    style={{
                        position: "absolute",
                        top: 0, left: 0,
                        width: cameraSize
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