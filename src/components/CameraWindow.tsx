import React, { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import IndividualCamera from "./IndividualCamera"



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


    const cameraViews = []
    for (let i=0; i<numberOfDevices.current; i++) 
        cameraViews.push(
            <IndividualCamera
                number={i+1}
                ID={cameraIDs[i]}
            /> 
    )



    return (
        <div style={{display: "flex", flexDirection: "column"}}>
        
            <tbody>{cameraViews}</tbody>

        </div>
    )
}

export default CameraWindow