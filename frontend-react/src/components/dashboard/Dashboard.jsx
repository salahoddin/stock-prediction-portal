import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";


function Dashboard() {
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/auth/protected-view/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProtectedData();
    }, []);

    return (
        <>
            <div className="container text-light" >Dashboard</div>
        </>
    )
}

export default Dashboard;
