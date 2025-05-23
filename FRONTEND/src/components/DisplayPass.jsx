import { useRecoilState } from "recoil"
import { VisiblePass } from "../Atoms/VisiblePass"

export default function DisplayPass({ btntype }) {
    const [visible, setVisible] = useRecoilState(VisiblePass)

    const toggleVisibility = () => {
        setVisible(prev => ({
            ...prev,
            [btntype]: prev[btntype] === 0 ? 1 : 0
        }))
    }

    const iconSrc = visible[btntype] === 0 ? "eye-solid.svg" : "eye-slash-solid.svg"

    return (
        <button 
            onClick={toggleVisibility}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors focus:outline-none"
            type="button"
            aria-label={visible[btntype] === 0 ? "Show password" : "Hide password"}
        >
            <img 
                className="h-5 w-5" 
                src={iconSrc} 
                alt={visible[btntype] === 0 ? "Visible" : "Hidden"}
            />
        </button>
    )
}