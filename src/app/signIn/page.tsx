'use client'

import dynamic from 'next/dynamic';

const Background = dynamic(() => import('@signIn/background'), { ssr: false });
const SocialSignInForm = dynamic(() => import('@signIn/socialSignInForm'));
const Header = dynamic(() => import('@signIn/header'));
// import Background from '@signIn/background';
// import SocialSignInForm from '@signIn/socialSignInForm';
// import Header from '@signIn/header';
import Footer from 'src/app/footer';

const SignIn: React.FC = () => {

  return (
    <div className="flex flex-col items-center gap-12">
      <Background />
      <Header />
      <SocialSignInForm />
      {/* <Footer /> */}
    </div>
  );
};

export default SignIn;