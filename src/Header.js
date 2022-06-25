import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  const [current_theme, setCurrentTheme] = useState(null);

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme) {
      setCurrentTheme(theme);
      const body = document.querySelector('body');
      body.classList.add(`${theme}-theme`);
    } else {
      setCurrentTheme('light');
      const body = document.querySelector('body');
      body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (current_theme === 'light') {
      setCurrentTheme('dark');
      localStorage.setItem('theme', 'dark');
      const body = document.querySelector('body');
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      setCurrentTheme('light');
      localStorage.setItem('theme', 'light');
      const body = document.querySelector('body');
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  return (
    <header>
      <div className="header-wrap flex">
        <h1 className="logo">Where in the World?</h1>
        <button className="theme-switcher" onClick={toggleTheme}>
          <FontAwesomeIcon 
            icon={current_theme === 'light'
                    ? faMoon
                    : faSun
                  } 
            className="theme-icon"
          />
          {current_theme === 'light' 
            ? 'Dark Mode'
            : 'Light Mode'
          }
        </button>
      </div>
    </header>
  )
}

export default Header