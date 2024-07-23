

interface Props {
    ear: "left"|"right"
    earCallback: (ear: "left"|"right") => void
    canal: "posterior"|"anterior"|"lateral"|""
    canalCallback: (canal: "posterior"|"anterior"|"lateral") => void
}

const SelectWindow = ({ear, earCallback, canal, canalCallback}: Props) => {


    return (
        <div style={{display: "flex", flexDirection: "column", alignContent: "center"}}>
            <button className="btn" 
                    style={{backgroundColor: "#0022AA", outlineColor: "#0022AA"}}>Posterior</button>
            <div style={{height: 2}}/>

            <button className="btn" 
                    style={{backgroundColor: "#FFBB33", outlineColor: "#FFBB33"}}>Anterior</button>
            <div style={{height: 2}}/>

            <button className="btn" 
                    style={{backgroundColor: "#AA9988", outlineColor: "#AA9988"}}>Lateral</button>
        </div>
    )
}

export default SelectWindow