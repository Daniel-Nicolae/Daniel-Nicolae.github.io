import React, { useEffect, useRef, useState } from "react"
import IndividualCamera from "./IndividualCamera"
import computeCurrentVectors from "../utils/currentVectors"
import { Matrix4, Vector3 } from "three"
import getRotationMatrix from "../utils/getRotationMatrix"


interface Props {
    matrixRef: React.MutableRefObject<Matrix4>
}


const CameraWindow = ({matrixRef}: Props) => {

    const [cameraIDs, setCameraIDs] = useState<string[]>([])

    const vectorsRef = useRef<Vector3[]>([]) // 2 of the basis vectors computed from landmarks

    // landmarks from each camera
    const cameraLandmarksRefs = [useRef<Vector3[]>([new Vector3(), new Vector3(), new Vector3()]),
                                 useRef<Vector3[]>([new Vector3(), new Vector3(), new Vector3()]),
                                 useRef<Vector3[]>([new Vector3(), new Vector3(), new Vector3()])]

    // true if no camera detects face
    const [lost, setLost] = useState(false)

    useEffect(() => {
        // initialize the cameras
        async function getDevices() {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const cameraDevices = devices.filter((item) => item.kind === "videoinput")
            const cameraIDs_temp = cameraDevices.map((item, index) => item.deviceId)
            setCameraIDs(cameraIDs_temp)
        }
        getDevices()

        let loop = setInterval(() => {
            // every 30 ms read the landmarks from each camera and compute corresponding basis vectors
            computeCurrentVectors(cameraLandmarksRefs, vectorsRef, setLost)
            if (vectorsRef.current.length > 0) {
                // use basis vectors to get the rotation matrix
                matrixRef.current = getRotationMatrix(vectorsRef.current)
            }
                
        }, 30)

        return () => {
            clearInterval(loop)
        }
     }, [])


    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{height: "2vh"}}/>  

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

            {lost &&
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{width: "8vw"}}/>
                <div style={{fontSize: "1.25vw", color: "#AA1122", fontWeight: "bold"}}>
                    FACE TRACKING LOST!</div>
            </div>}

        </div>
    )
}

export default CameraWindow