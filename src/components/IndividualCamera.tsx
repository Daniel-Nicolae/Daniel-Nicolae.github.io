import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import vision, { DrawingUtils, FaceLandmarker } from "@mediapipe/tasks-vision"
import createFaceLandmarker from "../utils/model"
import { cameraSize, videoSize, usefulLandmarksIDs } from "../utils/config"
import { Vector3 } from "three"
import Toggler from "./Toggler"
import { cameraMatrices } from "../utils/cameraPositions"

interface Props {
    number: number
    IDs: string[]
    landmarksRef: React.MutableRefObject<Vector3[]>
    isClinicalRef: React.MutableRefObject<boolean>
}

const IndividualCamera = ({number, IDs, landmarksRef, isClinicalRef}: Props) => {

    // toggle handler
    const [IDi, setIDi] = useState(number-1)
    const handleToggle = () => {
        clearInterval(loop)
        setIDi((IDi + 1) % IDs.length)
    }

    // facemesh drawing
    const drawMesh = useRef(false)

    // face model loader
    const model = useRef<vision.FaceLandmarker>() as React.MutableRefObject<vision.FaceLandmarker>
    useEffect(() => {
        createFaceLandmarker(model)

        return () => {clearInterval(loop)}
    }, [IDi])


    // model inference 
    let loop: NodeJS.Timer
    const handleVideoLoad = async (videoNode: SyntheticEvent) => {

        const video = videoNode.target as HTMLVideoElement
        if (video.readyState !== 4) return

        const canvasElement = document.getElementById("modelCanvas" + number) as HTMLCanvasElement

        canvasElement.setAttribute("width", "" + cameraSize)
        canvasElement.setAttribute("height", "" + cameraSize)

        const canvasCtx = canvasElement.getContext("2d")!
        const drawingUtils = new DrawingUtils(canvasCtx)

        loop = setInterval(renderLoop, 30)
        function renderLoop() {

            // inference
            const faceLandmarkerResult = model.current.detectForVideo(video, performance.now())
            

            // drawing
            if (faceLandmarkerResult.faceLandmarks[0]) {

                // extract useful landmarks only and save in ref
                const usefulLandmarks = usefulLandmarksIDs.map((item) => faceLandmarkerResult.faceLandmarks[0][item])

                    // -y and -z to convert from y positive downwards (model) to upwards (rendering)
                landmarksRef.current = usefulLandmarks.map((item) => {
                    const landmarkVec = new Vector3(item.x, -item.y, -item.z)
                    if (isClinicalRef.current) landmarkVec.applyMatrix4(cameraMatrices[number-1])
                    return landmarkVec
                })

                // draw face mesh
                canvasCtx.clearRect(0, 0, cameraSize, cameraSize)
                if (drawMesh.current) drawingUtils.drawConnectors(
                                        faceLandmarkerResult.faceLandmarks[0],
                                        FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                                        { color: "#000000", lineWidth: 0.6 })

                // draw useful landmarks
                drawingUtils.drawLandmarks(usefulLandmarks,
                                        {radius: 4, lineWidth: 2, 
                                        fillColor: "#FFFFFF", color: "#0022AA"})
            }
            else {
                landmarksRef.current = [new Vector3(), new Vector3(), new Vector3()]
                canvasCtx.clearRect(0, 0, cameraSize, cameraSize)
            }
        }
    }


    return (
        <>
        <div style={{height: 5}}/>

        <div style={{display: "flex", flexDirection: "row", height: cameraSize, alignItems: "center"}}>

            <div style={{display: "flex", flexDirection: "column", height: cameraSize, alignItems: "center", justifyContent: "center"}}>
                {number === 1 && <>
                    <Toggler boolRef={isClinicalRef} label="In clinic"/>
                    <div style={{height: 10}}/>
                    </>}

                <div style={{fontSize: 24}}> Camera {number} </div> 
                <div style={{height: 15}}/>
                <button className="btn btn-outline-dark btn-lg" onClick={handleToggle}> Toggle </button>
                <div style={{height: 20}}/>
                <Toggler boolRef={drawMesh} label="Face mesh"/>
            </div> 

            <div style={{width: 25}}/>

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