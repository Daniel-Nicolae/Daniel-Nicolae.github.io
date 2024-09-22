import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import vision, { DrawingUtils, FaceLandmarker } from "@mediapipe/tasks-vision"
import createFaceLandmarker from "../utils/model"
import { cameraSize, videoSize, usefulLandmarksIDs } from "../utils/config"
import { Vector3 } from "three"
import { cameraMatrices } from "../utils/cameraPositions"

interface Props {
    number: number
    IDs: string[]
    landmarksRef: React.MutableRefObject<Vector3[]>
}

const labels = ["Left", "Top", "Right"]

const IndividualCamera = ({number, IDs, landmarksRef}: Props) => {

    // toggle handler
    const [IDi, setIDi] = useState(number-1)
    const handleToggle = () => {
        clearInterval(loop)
        setIDi((IDi + 1) % IDs.length)
    }

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

        // setup drawing stuff
        const canvasElement = document.getElementById("modelCanvas" + number) as HTMLCanvasElement
        canvasElement.setAttribute("width", "" + document.documentElement.clientWidth * 0.145)
        canvasElement.setAttribute("height", "" + document.documentElement.clientWidth * 0.145)
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

                // -y and -z to convert from y positive downwards (model) to upwards (camera)
                landmarksRef.current = usefulLandmarks.map((item) => {
                    const landmarkVec = new Vector3(item.x, -item.y, -item.z)

                    // from real camera coord system to world coord system
                    landmarkVec.applyMatrix4(cameraMatrices[number-1])
                    return landmarkVec
                })

                // draw useful landmarks
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
                drawingUtils.drawLandmarks(usefulLandmarks,
                                        {radius: 4, lineWidth: 2, 
                                        fillColor: "#FFFFFF", color: "#0022AA"})
            }
            else {
                landmarksRef.current = [new Vector3(), new Vector3(), new Vector3()]
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
            }
        }
    }


    return (
        <>
        <div style={{height: "0.5vh"}}/>

        <div style={{display: "flex", flexDirection: "row", height: cameraSize, alignItems: "center"}}>

            <div style={{display: "flex", flexDirection: "column", height: cameraSize, alignItems: "center", justifyContent: "center", width: "6vw"}}>
                {/* {number === 1 && <>
                    <Toggler boolRef={isClinicalRef} label="In clinic"/>
                    <div style={{height: 10}}/>
                    </>} */}

                <div style={{fontSize: "1.25vw", textAlign: "center"}}>{labels[number-1] + " Camera"} </div> 
                <div style={{height: "1.5vh"}}/>
                <button className="btn btn-outline-dark" onClick={handleToggle} style={{fontSize: "1vw"}}> Toggle </button>
            </div> 

            <div style={{width: "1.5vw"}}/>

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

        <div style={{height: "0.5vh"}}/>
        </>
    )
}

export default IndividualCamera