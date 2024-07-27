import { useState } from "react"


interface Props {
    ear: "left"|"right"
    canal: "posterior"|"anterior"|"lateral"|""
    earCallback: (ear: "left"|"right") => void
    canalCallback: (canal: "posterior"|"anterior"|"lateral") => void
}

const SelectWindow = ({ear, canal, earCallback, canalCallback}: Props) => {

    const [isHoverP, setIsHoverP] = useState(false)
    const [isHoverA, setIsHoverA] = useState(false)
    const [isHoverL, setIsHoverL] = useState(false)
    const [isHoverLE, setIsHoverLE] = useState(false)
    const [isHoverRE, setIsHoverRE] = useState(false)

    const handleMouseEnter = (c: "p"|"a"|"l"|"le"|"re") => {
        if (c === "p") setIsHoverP(true)
        if (c === "a") setIsHoverA(true)
        if (c === "l") setIsHoverL(true)
        if (c === "le") setIsHoverLE(true)
        if (c === "re") setIsHoverRE(true)
    }

    const handleMouseLeave = (c: "p"|"a"|"l"|"le"|"re") => {
        if (c === "p") setIsHoverP(false)
        if (c === "a") setIsHoverA(false)
        if (c === "l") setIsHoverL(false)
        if (c === "le") setIsHoverLE(false)
        if (c === "re") setIsHoverRE(false)
    }


    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                <div style={{height: 40}}/>
                <div style={{fontSize: 24}}>Please select the affected canal and ear</div>
                <div style={{height: 60}}/>

        <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center"}}>

            <div style={{display: "flex", flexDirection: "column", width: "40%", alignItems: "center"}}>
                
                <div>
                <button className="btn btn-lg"
                        onClick={() => {canalCallback("posterior")}} 
                        onMouseEnter={() => {handleMouseEnter("p")}}
                        onMouseLeave={() => {handleMouseLeave("p")}}
                        style={{backgroundColor: isHoverP ? "#0022AA" : "white", 
                                borderColor: "#0022AA", 
                                color: isHoverP ? "white" : "#0022AA"}}>Posterior</button>
                <div style={{height: 10}}/>
                </div>

                <div>
                <button className="btn btn-lg" 
                        onMouseEnter={() => {handleMouseEnter("a")}}
                        onMouseLeave={() => {handleMouseLeave("a")}}
                        onClick={() => {canalCallback("anterior")}}
                        style={{backgroundColor: isHoverA ? "#EEAA22" : "white", 
                                borderColor: "#EEAA22", 
                                color: isHoverA ? "white" : "#EEAA22"}}>Anterior</button>
                <div style={{height: 10}}/>
                </div>

                <div>
                <button className="btn btn-lg" 
                        onMouseEnter={() => {handleMouseEnter("l")}}
                        onMouseLeave={() => {handleMouseLeave("l")}}
                        onClick={() => {canalCallback("lateral")}}
                        style={{backgroundColor: isHoverL ? "#887766" : "white", 
                                borderColor: "#887766", 
                                color: isHoverL ? "white" : "#887766"}}>Lateral</button>
                <div style={{height: 10}}/>
                </div>
            </div>

            <div style={{width: 20}}/>

            <div style={{display: "flex", flexDirection: "column", width: "40%", alignItems: "center"}}>
                <div>
                <button className="btn btn-lg" 
                        onMouseEnter={() => {handleMouseEnter("le")}}
                        onMouseLeave={() => {handleMouseLeave("le")}}
                        onClick={() => {earCallback("left")}}
                        style={{backgroundColor: isHoverLE ? "black" : "white", 
                                borderColor: "black", 
                                color: isHoverLE ? "white" : "black"}}>Left</button>
                <div style={{height: 10}}/>
                </div>

                <div>
                <button className="btn btn-lg" 
                        onMouseEnter={() => {handleMouseEnter("re")}}
                        onMouseLeave={() => {handleMouseLeave("re")}}
                        onClick={() => {earCallback("right")}}
                        style={{backgroundColor: isHoverRE ? "black" : "white", 
                                borderColor: "black", 
                                color: isHoverRE ? "white" : "black"}}>Right</button>
                </div>
            </div>
        </div>
        <div style={{height: 40}}/>
        {canal ? <div style={{fontSize: 24}}>{"Affected:  " + ear + " " + canal}</div> : 
                 <div style={{height: 36}}></div>}
        </div>
    )
}

export default SelectWindow