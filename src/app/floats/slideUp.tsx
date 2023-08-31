'use client'

import { useWindowSize } from '@hooks/useWindowSize';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

interface SlideUpProps {
  idString: string,
  contentArea: JSX.Element,
  buttonArea: JSX.Element,
};

const FloatedSlideUp: React.FC<SlideUpProps> = ({ idString, contentArea, buttonArea }) => {
  
  const windowSize = useWindowSize();
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  return (
    <div 
      id={ idString }
      style={{ width: `${ windowSize.width }px` }}
      className={`
      fixed z-30 bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-2
      rounded-tl-[10px] rounded-tr-[10px] overflow-hidden
      laptop:h-[140px]
      tablet:h-[140px]
      mobile:h-[120px]
      smallest:h-[60px]
      ${ environmentVariables.backgroundMode ? 'bg-gray-100 text-black' : 'bg-[#2A303C] text-white' }
    `}>
      { contentArea }
      { buttonArea }
    </div>
  );
};

export default FloatedSlideUp;