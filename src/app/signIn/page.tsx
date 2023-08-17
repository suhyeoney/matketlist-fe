import dynamic from 'next/dynamic';

const Background = dynamic(() => import('@signIn/background'), { ssr: true });
const SocialSignInForm = dynamic(() => import('@signIn/socialSignInForm'), { ssr: true });
const Header = dynamic(() => import('@signIn/header'), { ssr: true });

interface SignInProps {
  pageProps: string
};

const SignIn: React.FC<SignInProps> = ({ pageProps }) => {

  // console.log('SignIn Component > pageProps', pageProps);

  return (
    <div 
      id="signInPage"
      className="relative flex flex-col h-screen items-center gap-12"
    >
      <Background />
      <Header />
      <SocialSignInForm />
    </div>
  );
};

export default SignIn;