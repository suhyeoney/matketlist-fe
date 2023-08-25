'use client'

import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

interface SlideUpProps {
  idString: string,
  contentArea: JSX.Element,
  buttonArea: JSX.Element,
};

const FloatedSlideUp: React.FC<SlideUpProps> = ({ idString, contentArea, buttonArea }) => {
  
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  return (
    <div 
      id={ idString }
      className={`
      fixed z-30 bottom-0 left-0 right-0 w-full flex flex-col items-center justify-center gap-2
      rounded-tl-[10px] rounded-tr-[10px] overflow-hidden
      laptop:h-[140px]
      tablet:h-[140px]
      mobile:h-[120px]
      smallest:h-[60px]
      ${ environmentVariables.backgroundMode ? 'bg-[#2A303C] text-white' : 'bg-white text-black' }
    `}>
      { contentArea }
      { buttonArea }
    </div>
  );
};

export default FloatedSlideUp;