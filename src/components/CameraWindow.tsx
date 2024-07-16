import React, { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import IndividualCamera from "./IndividualCamera"
import vision from "@mediapipe/tasks-vision"
import computeAverageLandmarks from "../utils/averageLandmarks"


interface Props {
    landmarksRef: React.MutableRefObject<vision.NormalizedLandmark[]>
}


const CameraWindow = ({landmarksRef}: Props) => {

    const [cameraIDs, setCameraIDs] = useState<string[]>([])


    useEffect(() => {
        async function getDevices() {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const cameraDevices = devices.filter((item) => item.kind === "videoinput")
            const cameraIDs_temp = cameraDevices.map((item, index) => item.deviceId)
            setCameraIDs(cameraIDs_temp)
        }
        getDevices()
        // let loop = setInterval(() => {computeAverageLandmarks(cameraLandmarksRefs, landmarksRef)}, 1000)

        return () => {
            // clearInterval(loop)
        }
     }, [])

    const cameraLandmarksRefs = [useRef<vision.NormalizedLandmark[]>([]),
                                 useRef<vision.NormalizedLandmark[]>([]),
                                 useRef<vision.NormalizedLandmark[]>([])]

    return (
        <div style={{display: "flex", flexDirection: "column"}}>

            <IndividualCamera
                    number={1}
                    IDs={cameraIDs}
                    landmarksRef={cameraLandmarksRefs[0]}
                />

            <IndividualCamera
                    number={2}
                    IDs={cameraIDs}
                    landmarksRef={cameraLandmarksRefs[1]}
                />

            <IndividualCamera
                    number={3}
                    IDs={cameraIDs}
                    landmarksRef={cameraLandmarksRefs[2]}
                />

        </div>
    )
}

export default CameraWindow