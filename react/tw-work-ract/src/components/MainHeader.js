import React from 'react';

const filters = [
    { url: '/all', title: 'All', active: false },
    { url: '/physical', title: 'Physical', active: true },
    { url: '/virtual', title: 'Virtual', active: false }
];

const MainHeader = () => (
    <header className="main-header">
        <h2>Agents</h2>
        <ul className="filter">
            {filters.map((filter, index) => (
                <li
                    className={filter.active ? 'active' : ''}
                    key={'filter-item-' + index}
                >
                    <a href={filter.url}>{filter.title}</a>
                </li>
            ))}
        </ul>
    </header>
);

export default MainHeader;    