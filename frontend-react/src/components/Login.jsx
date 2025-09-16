import { useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/token/`,
                formState
            );
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            console.log("login successful");

            setErrors("");

            navigate("/")
        } catch (error) {
            console.error(`login Error: ${error.response.data}`);
            setErrors("invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-light-dark p-5 rounded">
                        <h3 className="text-light text-center">Log in to your Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control mb-2" placeholder="Enter username" name="username" value={formState.username} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control mb-2" placeholder="Enter password" name="password" value={formState.password} onChange={handleChange} />
                            </div>
                            {errors && <div className="alert alert-danger">{errors}</div>}
                            {loading ? <div className="btn btn-info form-control mb-2 disabled"> <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon> Logging in... </div> : <button type="submit" className="btn btn-info form-control mb-2">Login</button>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login