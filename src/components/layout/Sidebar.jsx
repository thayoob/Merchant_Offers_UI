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
                    <li className={isActive('/Merchant') ? 'active' : ''}>
                        <NavLink to="/Merchant">
                            Merchants
                        </NavLink>
                    </li>
                    <li className={isActive('/Offer') ? 'active' : ''}>
                        <NavLink to="/Offer">
                            Offers
                        </NavLink>
                    </li>
                    <li className={isActive('/VoucherCode') ? 'active' : ''}>
                        <NavLink to="/VoucherCode">
                            Voucher Codes
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
