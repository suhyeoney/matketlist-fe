import Main from '@main/page';

import React from 'react';

const printString = async () => {
  const name = 'MainLayout';
  return {
    props: {
      name,
    },
  };
}

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const { props } = await printString();
  if(props.name !== undefined) {
    return (
      <Main />
    );
  };
}

export default MainLayout;
