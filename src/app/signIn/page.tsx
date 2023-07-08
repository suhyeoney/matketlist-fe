'use client'

import Background from '@signIn/background';
import SocialSignInForm from '@signIn/socialSignInForm';
import Header from '@signIn/header';
import Footer from '@signIn/footer';

const SignIn: React.FC = () => {

  return (
    <div className="flex flex-col items-center gap-12">
      <Background />
      <Header />
      <SocialSignInForm />
      <Footer />
    </div>
  );
};

export default SignIn;