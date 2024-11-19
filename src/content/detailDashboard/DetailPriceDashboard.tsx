import React from 'react';

interface RankProps {
    id: number;
}

const DetailPriceDashboard: React.FC<RankProps> = ({ id }) => {
    return (
        <div>
            {id}
        </div>
    );
};

export default DetailPriceDashboard;
