/* import { Link } from "react-router-dom"; */


type ButtonProps = {
    text: String,
    type: "submit" | "reset" | "button" | undefined,
    classes: String,
    method: () => void,
}


export default function Button({ text, type, method, classes } : ButtonProps) {

    return (
        <button type={type} className={`${classes}`} onClick={method}>
            {text}
        </button>
    )
}