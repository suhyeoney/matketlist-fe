import dynamic from 'next/dynamic';

import React from 'react';

const FullContainer = dynamic(() => import('@main/fullContainer'), { ssr: true });

const Main = () => {

  return (
    <FullContainer />
  );
};

export default Main;