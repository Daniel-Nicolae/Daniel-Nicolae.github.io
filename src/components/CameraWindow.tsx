import React, { useEffect, useRef, useState } from "react"
import IndividualCamera from "./IndividualCamera"
import computeCurrentLandmarks from "../utils/currentLandmarks"
import { Matrix4 } from "three"


interface Props {
    ear: "left"|"right"
    matrixRef: React.MutableRefObject<Matrix4>
}


const CameraWindow = ({ear, matrixRef}: Props) => {

    const [cameraIDs, setCameraIDs] = useState<string[]>([])


    useEffect(() => {
        async function getDevices() {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const cameraDevices = devices.filter((item) => item.kind === "videoinput")
            const cameraIDs_temp = cameraDevices.map((item, index) => item.deviceId)
            setCameraIDs(cameraIDs_temp)
        }
        getDevices()
        let loop = setInterval(() => {computeCurrentLandmarks(cameraMatrixRefs, matrixRef)}, 30)

        return () => {
            clearInterval(loop)
        }
     }, [])

    const cameraMatrixRefs = [useRef<Matrix4>(new Matrix4()),
                              useRef<Matrix4>(new Matrix4()),
                              useRef<Matrix4>(new Matrix4())]

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{height: 10}}/>  

            <IndividualCamera
                    number={1}
                    IDs={cameraIDs}
                    ear={ear}
                    matrixRef={cameraMatrixRefs[0]}
                />

            <IndividualCamera
                    number={2}
                    IDs={cameraIDs}
                    ear={ear}
                    matrixRef={cameraMatrixRefs[1]}
                />

            <IndividualCamera
                    number={3}
                    IDs={cameraIDs}
                    ear={ear}
                    matrixRef={cameraMatrixRefs[2]}
                />

        </div>
    )
}

export default CameraWindow