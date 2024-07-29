import { useEffect, useRef, useState } from "react"
import useSound from "use-sound"
import { HIGH_THRESHOLD, LOW_THRESHOLD } from "../utils/config"

interface Props {
    stage: number
    alignmentRef: React.MutableRefObject<number>
    alignedRef: React.MutableRefObject<boolean>
}

const GREEN = "#44DD22"
const BLACK = "#000000"

const AlignmentDisplay = ({stage, alignmentRef, alignedRef}: Props) => {
    const [displayAlignment, setDisplayAligment] = useState(0.0)
    const [color, setColor] = useState(BLACK)

    const [playAligned] = useSound("sounds/aligned.mp3")
    const [playNotAligned] = useSound("sounds/naligned.mp3")

    useEffect(() => {
        setColor(BLACK)
        alignedRef.current = false
        const loop = setInterval(() => {
            const alignment = alignmentRef.current
            setDisplayAligment(alignment)

            if (alignment > HIGH_THRESHOLD && !alignedRef.current) {
                setColor(GREEN)
                alignedRef.current = true
                playAligned()
            }

            if (alignment < LOW_THRESHOLD && alignedRef.current) {
                setColor(BLACK)
                alignedRef.current = false
                playNotAligned()
            }
        }, 150)

        return () => {clearInterval(loop)}
    }, [stage])

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

            <div style={{height: 30}}/>
            <div style={{color: color, fontSize: 30}}>Alignment: {(displayAlignment*100).toFixed(2)}%</div>
        </div>
    ) 
    
}

export default AlignmentDisplay