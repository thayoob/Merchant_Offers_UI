import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-content">
                <div className="navbar-title"></div>
                <div
                    className="profile-section"
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                >
                    <FaUserCircle className="profile-icon" />
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <a href="/account">Account</a>
                            <a href="/logout">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
