import React from 'react';

interface PriceProps {
    id: number;
}

const DetailPriceDashboard: React.FC<PriceProps> = ({ id }) => {
    return (
        <div>
            {id}
        </div>
    );
};

export default DetailPriceDashboard;
