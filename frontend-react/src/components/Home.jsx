import Button from "./Button"

const Home = () => {
    return (
        <>
            <div className="container">
                <div className="p-5 text-center bg-light-dark rounded">
                    <h1 className="text-light">Stock Prediction Portal</h1>
                    <p className="text-light lead">This stock prediction application utilizes machine learning techniques, specifically emplying Keras, and LTM model, integrated within the Django framework. It forecasts future stock prices by analyzing 100-day and 200-day moving averages, essential indicators widely used by stock analysts to inform trading and investment decisions.</p>
                    <Button to="/dashboard" text="Explore Now" class="btn-outline-info"> </Button>
                </div>
            </div>
        </>
    )
}

export default Home
