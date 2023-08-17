import SignIn from './page';

const printString = async () => {
  const name = 'SignInLayout';
  return {
    props: {
      name,
    },
  };
}
 
const SignInLayout = async ({ children }: { children: React.ReactNode }) => { 
  const { props } = await printString();
  if(props.name !== undefined) {
    return (
      <>
        <SignIn pageProps={ props.name } />
        {/* { children } */}
      </>
    )
  };
};

export  default SignInLayout;