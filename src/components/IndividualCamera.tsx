import { useState } from "react"
import Webcam from "react-webcam"

interface Props {
    number: number
    ID: string
}

const IndividualCamera = ({number, ID}: Props) => {

    const [active, setActive] = useState(false)

    const handleChange = () => {
        setActive(!active)
    }

    return (
        <>
        <div style={{height: 5}}/>

        <div style={{display: "flex", flexDirection: "row", height: active ? 250 : 10, alignItems: "center"}}>
            <input
                type="checkbox"
                checked={active}
                onChange={handleChange}
            /> 

            <div> Camera {number} </div>
            

            <div style={{width: 20}}/>

            {active && 
            <Webcam
                videoConstraints={{
                    width: 600,
                    height: 600,
                    deviceId: ID
                }}
                style={{
                    width: 250
                }}
            />}
        </div>

        <div style={{height: 5}}/>
        </>
    )
}

export default IndividualCamera