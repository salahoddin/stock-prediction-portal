import { Link } from "react-router-dom"
const Button = (props) => {
    return (
        <>
            <Link className={`btn ${props.class}`} to={props.to}>{props.text}</Link>
        </>
    )
}

export default Button