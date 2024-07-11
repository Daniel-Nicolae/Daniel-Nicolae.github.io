import React, { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"


const CameraWindow = () => {

    const numberOfDevices = useRef<number>(1)
    const [cameraIDs, setCameraIDs] = useState<string[]>([])


    useEffect(() => {
        async function getDevices() {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const cameraDevices = devices.filter((item) => item.kind === "videoinput")
            const cameraIDs_temp = cameraDevices.map((item, index) => item.deviceId)
            console.log(cameraIDs_temp)
            setCameraIDs(cameraIDs_temp)
            numberOfDevices.current = cameraIDs_temp.length
        }
        getDevices()
    }, [])


    return (
        <>
        <Webcam
            videoConstraints={{
                width: 600,
                height: 600,
                deviceId: cameraIDs[0]
            }}
            style={{
                width: 200
            }}
        /> 
        <Webcam
            videoConstraints={{
                width: 600,
                height: 600,
                deviceId: cameraIDs[1]
            }}
            style={{
                width: 200
            }}
        /> 
        <Webcam
            videoConstraints={{
                width: 600,
                height: 600,
                deviceId: cameraIDs[2]
            }}
            style={{
                width: 200
            }}
        /> 
        </>
    )
}

export default CameraWindow