import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";


function Dashboard() {
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/api/protected-data');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

    }, []);

    return (
        <>
            <div className="container text-light" >Dashboard</div>
        </>
    )
}

export default Dashboard;
