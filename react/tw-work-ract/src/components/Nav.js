import React from 'react';

const navItems = [
    { url: '/dashboard', title: 'dashboard', active: false },
    { url: '/my-cruise', title: 'my cruise', active: false },
    { url: '/agents', title: 'agents', active: true },
    { url: '/help', title: 'help', active: false }
];

const Nav = () => (
    <div className="navbar">
        <div className="logo">Cruise</div>
        <nav className="nav">
            {navItems.map((item, index) => (
                <li
                    className={'nav-item' + (item.active ? ' active' : '')}
                    key={'nav-item-' + index}
                >
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </nav>
    </div>
);

export default Nav;