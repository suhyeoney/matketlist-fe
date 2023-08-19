import SignIn from '@signIn/page';

import React from 'react';

const printString = async () => {
  const domain = 'SignInPageProps';
  return {
    props: {
      domain
    }
  }
};
 
const SignInLayout = async ({ children }: { children: React.ReactNode }) => { 
  const { props } = await printString();
  if(props.domain !== undefined) {
    return (
      <SignIn params={ props } />
    )
  };
};

export default SignInLayout;