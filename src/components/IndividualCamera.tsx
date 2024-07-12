import { useState } from "react"
import Webcam from "react-webcam"

interface Props {
    number: number
    ID: string
}

const IndividualCamera = ({number, ID}: Props) => {

    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked)
    }

    return (
        <>
        <div style={{height: 5}}/>

        <div style={{display: "flex", flexDirection: "row", height: 200, alignItems: "center"}}>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            /> 

            <div> Camera {number} </div>
            

            <div style={{width: 20}}/>

            {checked && 
            <Webcam
                videoConstraints={{
                    width: 600,
                    height: 600,
                    deviceId: ID
                }}
                style={{
                    width: 200
                }}
            />}
        </div>

        <div style={{height: 5}}/>
        </>
    )
}

export default IndividualCamera