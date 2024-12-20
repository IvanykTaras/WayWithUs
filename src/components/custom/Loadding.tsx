import ReactLoading from "react-loading"

export const Loadding: React.FC = ()=>{
    return <>
    <div style={{
        width:"100%",
        height:"85vh",
        position:"sticky",
        top:"0",left:"0"
        }}>

        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height: "100%"
            }}>
        <ReactLoading type={"bars"} color={"fff"} width={200} height={200}/>
        </div>
    </div>
    </>
}

