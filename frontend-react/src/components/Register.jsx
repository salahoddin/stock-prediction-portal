import { useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



const Register = () => {

    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)

        if (formState.password !== formState.confirmPassword) {
            setErrors((prevState) => ({ ...prevState, confirmPassword: "Passwords do not match" }));
            return;
        }
        // delete formState.confirmPassword;
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/register/`,
                formState
            );
            console.log(response.data);
            console.log("Registration successful");
            setErrors({});
            setSuccess(true);
        } catch (error) {
            console.error(`Registration Error: ${error.response.data}`);
            setErrors(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-light-dark p-5 rounded">
                        <h3 className="text-light text-center">Create an Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control mb-2" placeholder="Enter username" name="username" value={formState.username} onChange={handleChange} />
                                <small>{errors.username && <div className="text-danger">{errors.username}</div>}</small>
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control mb-2" placeholder="Enter email" name="email" value={formState.email} onChange={handleChange} />
                                <small>{errors.username && <div className="text-danger">{errors.email}</div>}</small>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control mb-2" placeholder="Enter password" name="password" value={formState.password} onChange={handleChange} />
                                <small>{errors.password && <div className="text-danger">{errors.password}</div>}</small>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control mb-2" placeholder="Confirm password" name="confirmPassword" value={formState.confirmPassword} onChange={handleChange} />
                                <small>{errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}</small>
                            </div>
                            {success && <div className="alert alert-success">Registration successful!</div>}
                            {loading ? <div className="btn btn-info form-control mb-2 disabled"> <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon> Loading... </div> : <button type="submit" className="btn btn-info form-control mb-2">Register</button>}

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register