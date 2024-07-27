import { useEffect, useRef, useState } from "react"
import { meshPartsLength } from "../utils/alignment"
import useSound from "use-sound"

interface Props {
    stage: number
    canal: string
    stageCallback: (stage: number) => void
    alignmentRef: React.MutableRefObject<number>
}

const GREEN = "#44DD22"
const BLACK = "#000000"
const HIGH_THRESHOLD = 0.7
const LOW_THRESHOLD = 0.4
const DURATION = 5.0

const AlignmentDisplay = ({stage, canal, stageCallback, alignmentRef}: Props) => {
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
        if ((stage !== meshPartsLength[canal] - 1 && stage !== 0) || canal === "lateral")
            loop.current = setInterval(() => {
                const alignment = alignmentRef.current
                setDisplayAligment(alignment)

                if (alignment > HIGH_THRESHOLD && timer === -1.0) {
                    setColor(GREEN)
                    playAligned()
                    timer = 0.0
                }

                if (alignment > LOW_THRESHOLD && timer !== -1.0) {
                    timer += 0.15
                    setDisplayTimer(timer)
                    if (timer > DURATION) {
                        stageCallback((stage + 1) % meshPartsLength[canal]) 
                        timer = -1.0
                        setDisplayTimer(timer)
                        playStageDone()
                    }
                }
                if (alignment < LOW_THRESHOLD && timer !== -1.0) {
                    timer = -1.0
                    setDisplayTimer(timer)
                    setColor(BLACK)
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