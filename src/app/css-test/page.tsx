'use client'

import LoadingSpinner03 from '@spinners/loadingSpinner03';

const CssTest: React.FC = () => {

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center gap-12">
        {/* <LoadingSpinner03 cubeText={ 'MATKET' } infoText={ 'Loading...' } /> */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div>
    </div>
  );
};

export default CssTest;