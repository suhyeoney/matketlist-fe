'use client'

import dynamic from 'next/dynamic';

const Background = dynamic(() => import('@signIn/background'), { ssr: false });
const SocialSignInForm = dynamic(() => import('@signIn/socialSignInForm'));
const Header = dynamic(() => import('@signIn/header'));

const SignIn: React.FC = () => {

  return (
    <div className="flex flex-col h-screen items-center gap-12">
      <Background />
      <Header />
      <SocialSignInForm />
      {/* <Footer /> */}
    </div>
  );
};

export default SignIn;