

interface Props {
    canal: "posterior" | "anterior" | "lateral" | "all"
}

const CanalRendering = ({canal}: Props) => {



    return (
        <div style={{display: "flex", flexDirection: "column"}}>
        
            <div style={{textAlign: "center"}}>{canal}</div>
            <div style={{height: 5}}/>

            <div style={{width: 400, height: 400, backgroundColor: "red"}}></div>
        
        </div>

    )
}

export default CanalRendering