import { useState } from 'react';

const useMenu = (initialMenu = 'dashboard') => {
    const [activeMenu, setActiveMenu] = useState(initialMenu);
    return { activeMenu, setActiveMenu };
};

export default useMenu;
