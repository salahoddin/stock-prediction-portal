import Button from "./Button"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <nav className="navbar container pt-3 pb-3 align-items-start">
                <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>
                <div>
                    <Button text="Login" class="btn-outline-info" to="/login"> </Button>
                    &nbsp;
                    <Button text="Register" class="btn-info" to="/register"> </Button>
                </div>
            </nav>
        </>
    )
}

export default Header