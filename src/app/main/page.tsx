import dynamic from 'next/dynamic';

const FullContainer = dynamic(() => import('@main/fullContainer'), { ssr: true });

interface MainProps {
  pageProps: string
};

const Main: React.FC<MainProps> = ({ pageProps }) => {

  // console.log('SignIn Component > pageProps', pageProps);

  return (
    <FullContainer />
  );
};

export default Main;