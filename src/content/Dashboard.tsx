import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {UserRole} from "../redux/roles";

const Dashboard: React.FC = () => {
    const { userRole, userEmail } = useSelector((state: RootState) => state.auth);

    console.log(userRole, userEmail)

    return (
        <div className="dashboard">
            {userRole === UserRole.ADMIN && (
                <div className="admin-panel">
                    <h3>Admin Dashboard</h3>
                    <p>관리자 전용 기능이 여기에 표시됩니다.</p>
                </div>
            )}

            {userRole === UserRole.USER && (
                <div className="user-panel">
                    <h3>User Dashboard</h3>
                    <p>사용자 전용 기능이 여기에 표시됩니다.</p>
                </div>
            )}

            {userRole === UserRole.GUEST && (
                <div className="guest-message">
                    <p>로그인하지 않은 사용자입니다. 일부 기능이 제한됩니다.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
