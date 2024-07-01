import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="mb-4">
    <ul className="flex">
      <li className="mr-4">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/favorites">My Favorites</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
