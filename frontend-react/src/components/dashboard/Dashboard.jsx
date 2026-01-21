import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
    const [ticker, setTicker] = useState('')
    const [statusMessage, setStatusMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/auth/protected-view/');
                // console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProtectedData();
    }, []);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const response = await axiosInstance.post("/predict/", { ticker });
            console.log(response.data);
            setStatusMessage(response.data?.status ?? "success");
            setErrorMessage("");
        } catch (error) {
            console.log("API error:", error.response?.data);
            const apiStatus = error?.response?.data?.status;
            const apiMessage = error?.response?.data?.message;
            setErrorMessage(apiMessage || "error");
            setStatusMessage(apiMessage || apiStatus || "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container" >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control" placeholder="Enter Stock Ticker" onChange={(e) => setTicker(e.target.value)} />
                            <small>{errorMessage && <div className="text-danger">{errorMessage}</div>}</small>
                            <button type="submit" className="btn btn-info mt-3">
                                {loading ? <span><FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>Please Wait...</span> : "See Prediction"}
                            </button>
                        </form>
                        {statusMessage && <div className="mt-2">{statusMessage}</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
