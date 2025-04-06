import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { user, logout } = useAuth();

    return (
        <header className="navbar">
            <div className="navbar-content">
                <div className="navbar-title"></div>
                {user && (
                    <div
                        className="profile-section"
                        onMouseEnter={() => setDropdownVisible(true)}
                        onMouseLeave={() => setDropdownVisible(false)}
                    >
                        <FaUserCircle className="profile-icon" />
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                <span>{user.name}</span>
                                <span>{user.email}</span>
                                <button onClick={logout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;