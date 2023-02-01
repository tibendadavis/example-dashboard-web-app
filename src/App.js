import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';

import AddCar from './pages/addCar';
import Blog from './pages/Blog';
import Messages from './pages/Messages';
import AddBlog from './pages/AddBlog';
import Login from './pages/Login';
import Cars from './pages/Cars';

function App() {
  return (
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />

        <div className='dashboard-body'>
          <Routes>
            <Route path="*" element={<div></div>} />
            <Route exact path="/" element={< Login />} />
            <Route exact path="/cars" element={< Cars />} />
            <Route exact path="/addcar" element={< AddCar />} />
            <Route exact path="/blogs" element={<Blog />} />
            <Route exact path="/addblog" element={<AddBlog />} />
            <Route exact path="/messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;