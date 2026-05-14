import React from "react";
import '../../style/adminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <h1>Welcome Admin</h1>
            <p className="admin-message">
                You have full control over the platform. From here, you can manage products, view users, and handle order processing. Explore the available options to get started.
            </p>
        </div>
    );
};

export default AdminPage;
