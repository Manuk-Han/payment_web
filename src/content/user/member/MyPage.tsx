import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../../config/axiosInstance";
import "./css/MyPage.css";

interface MyInfo {
    name: string;
    email: string;
}

interface ChangePasswordForm {
    oldPassword: string;
    newPassword: string;
}

const MyPage: React.FC = () => {
    const [myPage, setMyPage] = useState<MyInfo>({ name: "", email: "" });
    const [passwordForm, setPasswordForm] = useState<ChangePasswordForm>({ oldPassword: "", newPassword: "" });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("Authorization") || "";

    useEffect(() => {
        const fetchMyPage = async () => {
            try {
                const response = await axiosInstance.get("/member/mypage", {
                    headers: { Authorization: `${token}` },
                });
                setMyPage(response.data);
                console.log("data", response.data);
            } catch {
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyPage();
    }, [token]);

    const handleUpdateProfile = async () => {
        try {
            await axios.post("/member/update/mypage", myPage, {
                headers: { Authorization: `${token}` },
            });
            alert("Profile updated successfully.");
        } catch {
            alert("Failed to update profile.");
        }
    };

    const handleUpdatePassword = async () => {
        if (!passwordForm.oldPassword || !passwordForm.newPassword) {
            alert("Please fill in both password fields.");
            return;
        }
        try {
            await axios.post("/member/update/password", passwordForm, {
                headers: { Authorization: `${token}` },
            });
            alert("Password updated successfully.");
            setPasswordForm({ oldPassword: "", newPassword: "" });
        } catch {
            alert("Failed to update password.");
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="myPage-container">
            <h1>My Page</h1>
            <div className="form-group">
                <label>
                    Name:
                    <input
                        type="text"
                        value={myPage.name}
                        onChange={(e) => setMyPage({ ...myPage, name: e.target.value })}
                    />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Email:
                    <input
                        type="email"
                        value={myPage.email}
                        onChange={(e) => setMyPage({ ...myPage, email: e.target.value })}
                    />
                </label>
            </div>
            <button className="button" onClick={handleUpdateProfile}>
                Update Profile
            </button>

            <h2>Change Password</h2>
            <div className="form-group">
                <label>
                    Old Password:
                    <input
                        type="password"
                        value={passwordForm.oldPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    />
                </label>
            </div>
            <div className="form-group">
                <label>
                    New Password:
                    <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    />
                </label>
            </div>
            <button className="button" onClick={handleUpdatePassword}>
                Change Password
            </button>
        </div>
    );
};

export default MyPage;
