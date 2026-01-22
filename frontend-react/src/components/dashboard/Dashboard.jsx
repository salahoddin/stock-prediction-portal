import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
    const [ticker, setTicker] = useState('')
    const [statusMessage, setStatusMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [plot, setPlot] = useState("");
    const [ma100, setMa100] = useState("");
    const [ma200, setMa200] = useState("");

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

            const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
            const plotUrl = `${backendRoot}${response.data.plot_img_url}`
            const ma100Url = `${backendRoot}${response.data.plot_100_dma_url}`
            const ma200Url = `${backendRoot}${response.data.plot_200_dma_url}`

            setMa100(ma100Url);
            setMa200(ma200Url);
            setPlot(plotUrl);

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
                            <input type="text" className="form-control" placeholder="Enter Stock Ticker ex: AAPL for apple, TSLA for tesla etc. Check yfinance for more." onChange={(e) => setTicker(e.target.value)} />
                            <small>{errorMessage && <div className="text-danger">{errorMessage}</div>}</small>
                            <button type="submit" className="btn btn-info mt-3">
                                {loading ? <span><FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>Please Wait...</span> : "See Prediction"}
                            </button>
                        </form>
                        {statusMessage && <div className="mt-2">{statusMessage}</div>}
                    </div>

                    {/* print prediction plots */}
                    <div className="prediction mt-5">
                        <div className="p-3">
                            {plot && (
                                <img
                                    src={plot}
                                    alt=""
                                    style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
                                />
                            )}
                        </div>
                        <div className="p-3">
                            {ma100 && (
                                <img
                                    src={ma100}
                                    alt=""
                                    style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
                                />
                            )}
                        </div>
                        <div className="p-3">
                            {ma200 && (
                                <img
                                    src={ma200}
                                    alt=""
                                    style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
