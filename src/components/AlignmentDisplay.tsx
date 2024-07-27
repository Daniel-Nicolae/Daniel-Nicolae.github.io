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
const DURATION = 5.0

const AlignmentDisplay = ({stage, stageCallback, alignmentRef, alignedRef}: Props) => {
    const [displayAlignment, setDisplayAligment] = useState(0.0)
    const [color, setColor] = useState(BLACK)
    const [displayTimer, setDisplayTimer] = useState(-1.0)
    const loop = useRef<NodeJS.Timer>()

    const [playAligned] = useSound("sounds/aligned.mp3")
    const [playNotAligned] = useSound("sounds/naligned.mp3")
    const [playStageDone] = useSound("sounds/stagedone.mp3")

    useEffect(() => {
        if (loop.current) clearInterval(loop.current)
        let timer = -1.0
        setColor(BLACK)
        alignedRef.current = false
        loop.current = setInterval(() => {
            const alignment = alignmentRef.current
            setDisplayAligment(alignment)

            if (alignment > HIGH_THRESHOLD && timer === -1.0) {
                setColor(GREEN)
                alignedRef.current = true
                playAligned()
                timer = 0.0
            }

            if (alignment > LOW_THRESHOLD && timer !== -1.0) {
                timer += 0.15
                setDisplayTimer(timer)
                if (timer > DURATION) {
                    stageCallback() 
                    timer = -1.0
                    setDisplayTimer(timer)
                    playStageDone()
                }
            }
            if (alignment < LOW_THRESHOLD && timer !== -1.0) {
                timer = -1.0
                setDisplayTimer(timer)
                setColor(BLACK)
                alignedRef.current = false
                playNotAligned()
            }
        }, 150)
    }, [stage])

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

            <div style={{height: 20}}/>
            <div style={{color: color, fontSize: 30}}>Alignment: {(displayAlignment*100).toFixed(2)}%</div>

            <div style={{height: 30}}/>
            {displayTimer !== -1.0 && 
                <div style={{color: color, fontSize: 30}}>
                    Keep for {(DURATION - displayTimer).toFixed(2)} seconds.
                </div>}
        </div>
    ) 
    
}

export default AlignmentDisplay