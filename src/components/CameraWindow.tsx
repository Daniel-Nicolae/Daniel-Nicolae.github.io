import React, { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"


interface Props {
    currCamRef: React.MutableRefObject<number>
}

const CameraWindow = ({currCamRef}: Props) => {


    const [currentCamera, setCurrentCamera] = useState(0)
    const numberOfDevices = useRef<number>(1)
    const [cameraIDs, setCameraIDs] = useState<string[]>([])

    const toggleCamera = () => {
        const nextCamera = (currentCamera + 1) % numberOfDevices.current
        setCurrentCamera(nextCamera)
        currCamRef.current = nextCamera
    }


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
                width: 960,
                height: 540,
                aspectRatio: 16/9,
                deviceId: cameraIDs[currentCamera]
            }}
        /> 
        <button onClick={toggleCamera}>toggle camera</button>
        </>
    )
}

export default CameraWindow