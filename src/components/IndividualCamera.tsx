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
        // clearInterval(loop)
        setActive(!active)
    }

    // face model loader
    let loop: number 
    const model = useRef<vision.FaceLandmarker>() as React.MutableRefObject<vision.FaceLandmarker>
    useEffect(() => {
        createFaceLandmarker(model)

        return () => {cancelAnimationFrame(loop)}
    })


    // model inference 
    const handleVideoLoad = async (videoNode: SyntheticEvent) => {

        const video = videoNode.target as HTMLVideoElement
        if (video.readyState !== 4) return

        loop = requestAnimationFrame(modelLoop)

        function modelLoop() {
            if (active) {
                
                // const video = document.getElementById("camera" + number) as HTMLVideoElement
                
                console.log(video.height)
    
            }
            loop = requestAnimationFrame(modelLoop)
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