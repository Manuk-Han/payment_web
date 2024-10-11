import React from 'react';

interface ProductProps {
    id: number;
}

const DetailProductDashboard: React.FC<ProductProps> = ({ id }) => {
    return (
        <div>
            {id}
        </div>
    );
};

export default DetailProductDashboard;
