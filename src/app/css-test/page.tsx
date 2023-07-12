'use client'

import LoadingSpinner03 from '@spinners/loadingSpinner03';

const CssTest: React.FC = () => {

  return (
    <div className="flex flex-col items-center gap-12">
        <LoadingSpinner03 cubeText={ 'MATKET' } infoText={ 'Loading...' } />
    </div>
  );
};

export default CssTest;