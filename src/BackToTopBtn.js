import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const BackToTopBtn = () => {

  const [showBtn, setShowBtn] = useState(false);

  const jumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    let scrollPos = 0;

    const scrollDistance = () => {
      scrollPos = window.scrollY;
      
      if (scrollPos > 500) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    }

    window.addEventListener('scroll', scrollDistance);
    return () => window.removeEventListener("scroll", scrollDistance);

  }, []);

  return (
    <>
      <button aria-label="return to top of page" onClick={jumpToTop} className={showBtn ? 'top-btn show' : 'top-btn'}>
        <FontAwesomeIcon icon={faArrowUp} className='top-btn-icon' />
      </button>
    </>
  )
}

export default BackToTopBtn