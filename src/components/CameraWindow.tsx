import React, { useEffect, useRef, useState } from "react"
import IndividualCamera from "./IndividualCamera"
import computeCurrentLandmarks from "../utils/currentLandmarks"
import { Matrix4, Vector3 } from "three"
import getRotationMatrix from "../utils/getRotationMatrix"


interface Props {
    matrixRef: React.MutableRefObject<Matrix4>
}


const CameraWindow = ({matrixRef}: Props) => {

    const [cameraIDs, setCameraIDs] = useState<string[]>([])

    const isClinicalRef = useRef(true)
    const landmarksRef = useRef<Vector3[]>([])
    const cameraLandmarksRefs = [useRef<Vector3[]>([new Vector3(), new Vector3(), new Vector3()]),
                                 useRef<Vector3[]>([new Vector3(), new Vector3(), new Vector3()]),
                                 useRef<Vector3[]>([new Vector3(), new Vector3(), new Vector3()])]

    const [lost, setLost] = useState(false)

    useEffect(() => {
        async function getDevices() {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const cameraDevices = devices.filter((item) => item.kind === "videoinput")
            const cameraIDs_temp = cameraDevices.map((item, index) => item.deviceId)
            setCameraIDs(cameraIDs_temp)
        }
        getDevices()
        let loop = setInterval(() => {
            computeCurrentLandmarks(cameraLandmarksRefs, landmarksRef)
            if (landmarksRef.current.length > 0) {
                matrixRef.current = getRotationMatrix(landmarksRef.current, isClinicalRef)
            }
                
        }, 30)

        return () => {
            clearInterval(loop)
        }
     }, [])


    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{height: 10}}/>  

            <IndividualCamera
                    number={1}
                    IDs={cameraIDs}
                    landmarksRef={cameraLandmarksRefs[0]}
                    isClinicalRef={isClinicalRef}
                />

            <IndividualCamera
                    number={2}
                    IDs={cameraIDs}
                    landmarksRef={cameraLandmarksRefs[1]}
                    isClinicalRef={isClinicalRef}
                />

            <IndividualCamera
                    number={3}
                    IDs={cameraIDs}
                    landmarksRef={cameraLandmarksRefs[2]}
                    isClinicalRef={isClinicalRef}
                />

        </div>
    )
}

export default CameraWindow