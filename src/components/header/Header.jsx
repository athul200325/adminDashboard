import React, { useState } from 'react';
import './Header.css';
import logoImg from '../../assets/logo.png';
import { CgProfile } from 'react-icons/cg';
import { LogOutIcon } from 'lucide-react';
import { GoPerson } from 'react-icons/go';

const Header = ({ isLoggedIn, onLogout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    setIsDropdownVisible(false);
    onLogout();
  };

  return (
    <header className="header">
      <img src={logoImg} alt="Logo" className="logo" />
      {isLoggedIn && ( // Show profile icon only when logged in
        <div className="profile">
          <CgProfile className='profile-icon' 
      onClick={toggleDropdown} />
          {isDropdownVisible && (
            <div className="dropdown">
              <button className="profile-button">
                <GoPerson className='profile-icon'/>ログアウト
              </button>
              <button className="logout-button" onClick={handleLogout}>
                <LogOutIcon className='logout-icon'/>ログアウト
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
