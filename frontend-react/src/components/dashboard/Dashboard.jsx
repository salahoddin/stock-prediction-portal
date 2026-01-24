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
    const [finalPlot, setFinalPlot] = useState("");
    const [evaluation, setEvaluation] = useState(null);
    const plotFrameStyle = { maxWidth: 1000, margin: "0 auto" };


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
            const finalPlotUrl = `${backendRoot}${response.data.final_prediction_plot_url}`
            const evaluation = response.data.evaluation


            setMa100(ma100Url);
            setMa200(ma200Url);
            setPlot(plotUrl);
            setFinalPlot(finalPlotUrl);
            setEvaluation(evaluation);

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
                                <div style={plotFrameStyle}>
                                    <img
                                        src={plot}
                                        alt=""
                                        style={{ width: "100%", display: "block" }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            {ma100 && (
                                <div style={plotFrameStyle}>
                                    <img
                                        src={ma100}
                                        alt=""
                                        style={{ width: "100%", display: "block" }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            {ma200 && (
                                <div style={plotFrameStyle}>
                                    <img
                                        src={ma200}
                                        alt=""
                                        style={{ width: "100%", display: "block" }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            {finalPlot && (
                                <div style={plotFrameStyle}>
                                    <img
                                        src={finalPlot}
                                        alt=""
                                        style={{ width: "100%", display: "block" }}
                                    />
                                </div>
                            )}
                        </div>
                        {evaluation && (
                            <div className="p-3">
                                <div className="text-light" style={plotFrameStyle}>
                            <h4>Model Evaluation</h4>
                            <p>Mean Squared Error (MSE): <span style={{ color: 'green' }}>{evaluation?.mse}</span></p>
                            <p>Root Mean Squared Error (RMSE): <span style={{ color: 'green' }}>{evaluation?.rmse}</span></p>
                            <p>R-Squared (r2): <span style={{ color: 'green' }}>{evaluation?.r2}</span></p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
