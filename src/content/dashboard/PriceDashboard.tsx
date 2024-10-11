import React from 'react';

const PriceDashboard: React.FC = () => {
    return (
        <div className="price-panel">
            <table className="price-table">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>High-end Smartphone</td>
                    <td>$999</td>
                </tr>
                <tr>
                    <td>Gaming Laptop</td>
                    <td>$1499</td>
                </tr>
                <tr>
                    <td>Wireless Headphones</td>
                    <td>$199</td>
                </tr>
                <tr>
                    <td>Digital Camera</td>
                    <td>$799</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PriceDashboard;
