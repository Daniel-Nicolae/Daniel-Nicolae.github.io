import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import vision from "@mediapipe/tasks-vision"
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
    const handleVideoLoad = async (videoNode: SyntheticEvent) => {

        const video = videoNode.target as HTMLVideoElement
        if (video.readyState !== 4) return

        const canvasElement = document.getElementById("modelCanvas" + number) as HTMLCanvasElement
        const canvasCtx = canvasElement.getContext("2d")

        loop = requestAnimationFrame(renderLoop)

        let lastVideoTime = -1
        function renderLoop() {
            
            if (video.currentTime !== lastVideoTime) {
                const faceLandmarkerResult = model.current.detectForVideo(video, video.currentTime)
                lastVideoTime = video.currentTime
                if (faceLandmarkerResult.faceLandmarks[0])
                    console.log(number + ": " + faceLandmarkerResult.faceLandmarks[0][10].x)
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
                    width: 600,
                    height: 600,
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