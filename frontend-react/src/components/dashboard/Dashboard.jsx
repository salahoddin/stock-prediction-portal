import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

function Dashboard() {
    const [ticker, setTicker] = useState('')
    const [statusMessage, setStatusMessage] = useState("");

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
        event.preventDefault();
        try {
            const response = await axiosInstance.post("/predict/", { ticker });
            console.log(response.data);
            setStatusMessage(response.data?.status ?? "success");
        } catch (error) {
            console.error(error);
            setStatusMessage("error");
        }
    };

    return (
        <>
            <div className="container" >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control" placeholder="Enter Stock Ticker" onChange={(e) => setTicker(e.target.value)} />
                            <button type="submit" className="btn btn-info mt-3">See Prediction</button>
                        </form>
                        {statusMessage && <div className="mt-2">{statusMessage}</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
