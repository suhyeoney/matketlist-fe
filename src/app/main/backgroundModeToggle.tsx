'use client'

import { useCallback } from 'react';
import image1 from '@assets/icons/light-mode.png';
import image2 from '@assets/icons/dark-mode.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { backgroundModeToggle } from '@store/features/environmentVariables/slice';
import Image from 'next/image';

const BackgroundModeToggle:React.FC = () => {

  // page view 에서 backgroundMode state를 관리하자니... backgroundModeToggle 컴포넌트까지 props로 두번 넘기는 것이 
  // 번거로워 redux에서 관리하는 것으로 진행
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const dispatch = useDispatch();

  const toggle = () => {
    const backgroundMode = environmentVariables.backgroundMode;
    dispatch(backgroundModeToggle(!backgroundMode));
  };

  const renderBackgroundModeIcon = useCallback(() => {
    const backgroundMode = environmentVariables.backgroundMode;
    switch(backgroundMode) {
      case true:
        return (
          <Image
            src={ image1.src }
            alt=""
            width="14"
            height="14"
            className="w-[14px] h-[14px]"
          />
        );
      case false:
        return (
          <Image 
            src={ image2.src }
            alt=""
            width="14"
            height="14"
            className="w-[14px] h-[14px]"
          />
        );
    }
  }, [ environmentVariables.backgroundMode ]);

  // 배경 dark / light 모드는 로컬 스토리지를 통해 저장 예정
  return (
    <div className="
      flex flex-col items-center justify-center p-[10px]
      laptop:gap-[5px] 
      tablet:gap-[5px] 
      mobile:gap-[5px] 
      smallest:gap-[2px] 
    ">
      <div className="item-center">
      </div>
      <div>
        <label className="toggle">
          <input 
            type="checkbox" 
            onClick={ toggle } 
            defaultChecked={ !environmentVariables.backgroundMode }
          />
          <span className={`
            x-slider round
            flex items-center px-[4px]
            ${ environmentVariables.backgroundMode ? 'justify-end' : 'justify-start' }
          `}>
          { renderBackgroundModeIcon() }
          </span>
        </label>
      </div>
    </div>
  );
}

export default BackgroundModeToggle;