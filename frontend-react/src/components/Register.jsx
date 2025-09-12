import { useState } from "react"
import axios from "axios"

const Register = () => {

const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
});

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
};

const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }
    if (formState.password !== formState.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // delete formState.confirmPassword;
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/register/", formState)
        console.log(response.data);
    } catch (error) {
        console.error(`Registration Error: ${error.response.data}`);
    }
};

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-light-dark p-5 rounded">
                        <h3 className="text-light text-center">Create an Account</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control mb-2" placeholder="Enter username" name="username" value={formState.username} onChange={handleChange}/>
                            <input type="email" className="form-control mb-2" placeholder="Enter email" name="email" value={formState.email} onChange={handleChange}/>
                            <input type="password" className="form-control mb-2" placeholder="Enter password" name="password" value={formState.password} onChange={handleChange}/>
                            <input type="password" className="form-control mb-5" placeholder="Confirm password" name="confirmPassword" value={formState.confirmPassword} onChange={handleChange}/>
                            <button type="submit" className="btn btn-info d-block mx-auto">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register