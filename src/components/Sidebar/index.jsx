import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import SideBarItem from './sidebar-item';

import './styles.css';
import logo from '../../assets/images/CFGMotors.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import { useNavigate } from 'react-router-dom';
import { clear } from '@testing-library/user-event/dist/clear';

function SideBar ({ menu }) {
    const location = useLocation();
    const [active, setActive] = useState(1);
    const[accepted, setaccepted] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        if (!window.sessionStorage.getItem('auth-token')) {
            console.log('no auth token set');
            nav("/");
        } else {
            const authToken = '123456abcdef';
            if (window.sessionStorage.getItem('auth-token') == authToken) {
                console.log('good token. Log in.')
                setaccepted(true)
            } else {
                console.log('bad token.')
                nav("/");
            }
        }

        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }
    function handleLogout() {
        setaccepted(false)
        if (!window.sessionStorage.getItem('auth-token')) {
            console.log('no auth token set');
        } else {
            const authToken = '123456abcdef';
            if (window.sessionStorage.getItem('auth-token') == authToken) {
                console.log('good token. Log in.')
                window.sessionStorage.setItem('auth-token', clear);
                setaccepted(false)
                nav("/");
            } else {
                console.log('bad token.')
            }
        }
        
    }

    return !accepted? (<></>):(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    <img
                        src={logo}
                        alt="logo" />
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <div className=' '>
                        <button onClick={handleLogout} className="text-center text-white font-sans font-bold flex mx-auto px-3 py-2 my-6 bg-blue-900 rounded-lg">
                        <span className=''>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className=' ' />
                            </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;