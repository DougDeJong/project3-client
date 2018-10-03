// components/navbar/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <nav className="nav-style">
      <ul>
        <li><Link to="/posts" style={{ textDecoration: 'none' }}>Posts</Link></li>
    </ul>
    </nav>
  )
}

export default navbar;