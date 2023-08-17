import Main from './page';

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
        <>
          <Main pageProps={ props.name } />
          {/* { children } */}
        </>
    );
  };
}

export default MainLayout;
