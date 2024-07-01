import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="mb-4">
      <ul className="flex">
        <li className={`mr-4 ${location.pathname === '/' ? 'text-blue-500' : ''}`}>
          <Link to="/" activeClassName="text-blue-500">
            Home
          </Link>
        </li>
        <li className={`${location.pathname === '/favorites' ? 'text-blue-500' : ''}`}>
          <Link to="/favorites" activeClassName="text-blue-500">
            My Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;