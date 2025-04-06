import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Merchant Offers</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li className={isActive('/') ? 'active' : ''}>
                        <NavLink to="/">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className={isActive('/Merchant') ? 'active' : ''}>
                        <NavLink to="/Merchant">
                            Merchant
                        </NavLink>
                    </li>
                    <li className={isActive('/products') ? 'active' : ''}>
                        <NavLink to="/products">
                            Offers
                        </NavLink>
                    </li>
                    <li className={isActive('/orders') ? 'active' : ''}>
                        <NavLink to="/orders">
                            Vouturs
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
