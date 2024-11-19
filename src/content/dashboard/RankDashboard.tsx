import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import "./css/RankDashboard.css";
import {useNavigate} from "react-router-dom";

interface ProductRank {
    productId: number;
    productName: string;
    soldCount: number;
}

const RankDashboard: React.FC = () => {
    const [rank, setRank] = useState<ProductRank[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRank = async () => {
            try {
                const response = await axiosInstance.get("/product/rank");
                console.log(response.data);
                setRank(response.data);
            } catch (err) {
                console.error("Failed to load rank.");
                setError("Failed to load rank.");
            } finally {
                setLoading(false);
            }
        };
        fetchRank();
    }, []);

    const handleProductDetail = async (productId: number) => {
        navigate(`/product/${productId}`);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="rank-dashboard">
            <h2>Top 5 Product Rankings</h2>
            <ul className="rank-list">
                {rank.map((item) => (
                    <li
                        key={item.productId}
                        onClick={() => handleProductDetail(item.productId)}
                        className="rank-item"
                    >
                        <span className="rank-name">{item.productName}</span> -
                        <span className="rank-sold"> Total Sold: {item.soldCount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RankDashboard;
