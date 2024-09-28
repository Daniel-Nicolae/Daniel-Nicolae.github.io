import React, { useEffect, useRef, useState } from "react"
import { Matrix4 } from "three"

interface Props {
    matrixRef: React.MutableRefObject<Matrix4>
}

const MatrixDisplay = ({matrixRef}: Props) => {

    let inverseCalibrationMatrix = useRef(new Matrix4())
    const calibrate = () => {
        inverseCalibrationMatrix.current = matrixRef.current
        inverseCalibrationMatrix.current.invert()
    }

    const [elementsString, setElementsString] = useState("")
    let loop: NodeJS.Timer
    let rotationMatrix = new Matrix4()
    useEffect(() => {
        loop = setInterval(() => {

            rotationMatrix.multiplyMatrices(matrixRef.current, inverseCalibrationMatrix.current)
            const elements = rotationMatrix.elements
            setElementsString("" + elements[0].toFixed(2) + " " + elements[4].toFixed(2) + " " + elements[8].toFixed(2) + "\n" + 
                                   elements[1].toFixed(2) + " " + elements[5].toFixed(2) + " " + elements[9].toFixed(2) + "\n" + 
                                   elements[2].toFixed(2) + " " + elements[6].toFixed(2) + " " + elements[10].toFixed(2) + "\n")
        }, 300)
    }, [])

    return <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{height: "15vh"}}/>

        <div style={{fontSize: "1.25vw"}}>
            {elementsString.split('\n').map(
                str => <div style={{display: "flex", flexDirection: "row"}}> {/* rows */}
                        {str.split(" ").map(num => <div style={{width: 80, textAlign: "right"}}>{num}</div>)}  {/* columns */}
                    </div>)}
        </div>

        <div style={{height: "2vh"}}/>
        <button className="btn btn-outline-dark"
                        style={{fontSize: "1vw"}}
                        onClick={calibrate}>Calibrate</button>
    </div>

}

export default MatrixDisplay