import React, { useEffect, useRef, useState } from "react"
import IndividualCamera from "./IndividualCamera"
import computeAverageLandmarks from "../utils/averageLandmarks"
import { Matrix3 } from "three"


interface Props {
    matrixRef: React.MutableRefObject<Matrix3>
}


const CameraWindow = ({matrixRef}: Props) => {

    const [cameraIDs, setCameraIDs] = useState<string[]>([])


    useEffect(() => {
        async function getDevices() {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const cameraDevices = devices.filter((item) => item.kind === "videoinput")
            const cameraIDs_temp = cameraDevices.map((item, index) => item.deviceId)
            setCameraIDs(cameraIDs_temp)
        }
        getDevices()
        let loop = setInterval(() => {computeAverageLandmarks(cameraMatrixRefs, matrixRef)}, 1000)

        return () => {
            clearInterval(loop)
        }
     }, [])

    const cameraMatrixRefs = [useRef<Matrix3>(new Matrix3()),
                              useRef<Matrix3>(new Matrix3()),
                              useRef<Matrix3>(new Matrix3())]

    return (
        <div style={{display: "flex", flexDirection: "column"}}>

            <IndividualCamera
                    number={1}
                    IDs={cameraIDs}
                    matrixRef={cameraMatrixRefs[0]}
                />

            <IndividualCamera
                    number={2}
                    IDs={cameraIDs}
                    matrixRef={cameraMatrixRefs[1]}
                />

            <IndividualCamera
                    number={3}
                    IDs={cameraIDs}
                    matrixRef={cameraMatrixRefs[2]}
                />

        </div>
    )
}

export default CameraWindow