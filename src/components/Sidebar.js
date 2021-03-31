import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { SidebarData } from './SidebarData';
import './Sidebar.css';


class Sidebar extends React.Component {
    render() {
        return (
            <>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <nav className='nav-menu'>
                        <ul className='nav-menu-items'>
                            <li className='sidebar-header'>
                            </li>
                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </IconContext.Provider>
            </>
        );
    }
}

export default Sidebar
