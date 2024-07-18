import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import vision, { DrawingUtils, FaceLandmarker } from "@mediapipe/tasks-vision"
import createFaceLandmarker from "../utils/model"
import { cameraSize, videoSize, usefulLandmarksIDs } from "../utils/config"
import { cameraMatrices } from "../utils/cameraPositions"
import { Matrix3, Vector3 } from "three"

interface Props {
    number: number
    IDs: string[]
    matrixRef: React.MutableRefObject<Matrix3>
}

const IndividualCamera = ({number, IDs, matrixRef}: Props) => {

    // toggle handler
    const [IDi, setIDi] = useState(number-1)
    const handleToggle = () => {
        setIDi((IDi + 1) % 3)
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
                    const usefulLandmarks = usefulLandmarksIDs.map((item) => faceLandmarkerResult.faceLandmarks[0][item])
                    matrixRef.current.set(usefulLandmarks[2].x, usefulLandmarks[4].x, usefulLandmarks[0].x, 
                                             usefulLandmarks[2].y, usefulLandmarks[4].y, usefulLandmarks[0].y, 
                                             usefulLandmarks[2].z, usefulLandmarks[4].z, usefulLandmarks[0].z)
                    matrixRef.current.multiply(cameraMatrices[IDi])

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
                    matrixRef.current.set(0, 0, 0, 0, 0, 0, 0, 0, 0)
                    canvasCtx.clearRect(0, 0, cameraSize, cameraSize)
                }
            }

            loop = requestAnimationFrame(renderLoop)
        }
    }


    return (
        <>
        <div style={{height: 5}}/>

        <div style={{display: "flex", flexDirection: "row", height: cameraSize, alignItems: "center"}}>

            <div style={{display: "flex", flexDirection: "column", height: cameraSize, alignItems: "center", justifyContent: "center"}}>
                <div style={{fontSize: 20}}> Camera {number} </div> 
                <div style={{height: 5}}/>
                <button onClick={handleToggle}> Toggle </button>
            </div> 

            <div style={{width: 40}}/>

            <div style={{position: "relative", height: cameraSize}}>
                <Webcam
                    id={"camera" + number} 
                    videoConstraints={{
                        width: videoSize,
                        height: videoSize,
                        deviceId: IDs[IDi]
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
                
            </div>

        </div>

        <div style={{height: 5}}/>
        </>
    )
}

export default IndividualCamera