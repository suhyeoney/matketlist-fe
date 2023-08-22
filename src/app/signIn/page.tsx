import dynamic from 'next/dynamic';

const Background = dynamic(() => import('@signIn/background'), { ssr: true });
const SocialSignInForm = dynamic(() => import('@signIn/socialSignInForm'), { ssr: true });
const Header = dynamic(() => import('@signIn/header'), { ssr: true });
const GoingtoTopFloatButton = dynamic(() => import('@signIn/goingToTopFloatButton'), { ssr: true });

interface SignInProps {
  params: { domain: string }
};

const SignIn: React.FC<SignInProps> = ({ params }) => {

  console.log('SignIn Component > pageProps', params.domain);

  return (
    <>
      <div 
        id="signInPage"
        className="relative flex flex-col h-screen items-center gap-12
        overflow-x-hidden overflow-y-scroll scrollbar-hide
      ">
        <Background />
        <Header />
        <SocialSignInForm />
      </div>
      <GoingtoTopFloatButton />
    </>
  );
};

export default SignIn;