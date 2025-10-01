import Button from "./Button"

const Home = () => {
    return (
        <>
            <div className="container">
                <div className="p-5 text-center bg-light-dark rounded">
                    <h1 className="text-light">Stock Prediction Portal</h1>
                    <p className="text-light lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ad explicabo ducimus repellat ab nostrum a ut? Eveniet quisquam quae corporis, nisi ipsam laboriosam praesentium repellendus laborum obcaecati alias cupiditate!</p>
                    <Button to="/dashboard" text="Explore Now" class="btn-outline-info"> </Button>
                </div>
            </div>
        </>
    )
}

export default Home
