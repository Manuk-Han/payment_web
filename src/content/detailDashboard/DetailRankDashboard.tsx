import React from 'react';

interface RankProps {
    id: number;
}

const DetailRankDashboard: React.FC<RankProps> = ({ id }) => {
    return (
        <div>
            {id}
        </div>
    );
};

export default DetailRankDashboard;
