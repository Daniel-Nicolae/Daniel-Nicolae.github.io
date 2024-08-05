import { useEffect, useRef, useState } from "react"
import useSound from "use-sound"
import { HIGH_THRESHOLD, LOW_THRESHOLD } from "../utils/config"

interface Props {
    stage: number
    stageCallback: () => void
    alignmentRef: React.MutableRefObject<number>
    alignedRef: React.MutableRefObject<boolean>
}

const GREEN = "#44DD22"
const BLACK = "#000000"

const AlignmentDisplay = ({stage, stageCallback, alignmentRef, alignedRef}: Props) => {
    const [displayAlignment, setDisplayAligment] = useState(0.0)
    const [color, setColor] = useState(BLACK)

    const [playAligned] = useSound("sounds/aligned.mp3")
    const [playNotAligned] = useSound("sounds/naligned.mp3")

    let loop: NodeJS.Timer
    useEffect(() => {
        loop = setInterval(() => {
            const alignment = alignmentRef.current

            if (alignment > HIGH_THRESHOLD && !alignedRef.current) {
                playAligned()
                setColor(GREEN)
                alignedRef.current = true
            }

            if (alignment < LOW_THRESHOLD && alignedRef.current) {
                setColor(BLACK)
                alignedRef.current = false
                playNotAligned()
            }

            setDisplayAligment(alignment)
        }, 150)

        return () => {
            clearInterval(loop)
            alignedRef.current = false
            alignmentRef.current = 0.0
            setColor(BLACK)
        }
    }, [stage, playAligned, playNotAligned])



    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{height: 10}}/>
            <div style={{color: color, fontSize: 24}}>Alignment: {(displayAlignment*100).toFixed(2)}%</div>
            <div style={{height: 10}}/>
            <button className="btn btn-lg btn-outline-dark" onClick={stageCallback}>Next stage</button>
        </div>
    ) 
    
}

export default AlignmentDisplay