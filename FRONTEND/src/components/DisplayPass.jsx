import { useRecoilState } from "recoil"
import { VisiblePass } from "../Atoms/VisiblePass"

export default function DisplayPass(props){

    const [visible, setVisible] = useRecoilState(VisiblePass)

    return(<button onClick={(   )=>{

        if (props.btntype === "signin") 
        {
            setVisible((prev) => ({
                ...prev,
                signin: prev.signin === 0 ? 1 : 0,
            }));
        } 

        else if(props.btntype === "signup")
        {
            setVisible((prev) => ({
                ...prev,
                signup: prev.signup === 0 ? 1 : 0,
            }));
        }
        
    }}>
        {props.btntype === "signin" ? <img className='min-h-8 max-h-8 min-w-8 max-w-8 pr-2 pb-2' src={visible.signin === 0 ? "eye-solid.svg" : "eye-slash-solid.svg"}/> : <img className='min-h-8 max-h-8 min-w-8 max-w-8 pr-2 pb-2' src={visible.signup === 0 ? "eye-solid.svg" : "eye-slash-solid.svg"}/>}
    </button>)
}