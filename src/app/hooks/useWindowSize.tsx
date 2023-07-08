'use client'

import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [ windowSize, setWindowSize ] = useState({
    width: window.innerWidth
  });

  useEffect(() => {
    console.log(windowSize);
  }, [ windowSize ]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
    });
    const currentUrl = window.location.href;
    if(currentUrl.includes('/signIn')) {
      window.location.reload();
    }
  }, 500);

  return windowSize;
};