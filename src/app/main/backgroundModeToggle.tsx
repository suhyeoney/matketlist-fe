'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';
import image1 from '@assets/icons/light-mode.png';
import image2 from '@assets/icons/dark-mode.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { backgroundModeToggle } from '@features/environmentVariables/environmentVariablesSlice';

const BackgroundModeToggle:React.FC = () => {

  // page view 에서 backgroundMode state를 관리하자니... backgroundModeToggle 컴포넌트까지 props로 두번 넘기는 것이 
  // 번거로워 redux에서 관리하는 것으로 진행

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const dispatch = useDispatch();

  const toggle = () => {
    const backgroundMode = environmentVariables.backgroundMode;
    const globalObj = {
      backgroundMode: '',
    };
    if(backgroundMode === 'L') {
      dispatch(backgroundModeToggle('D'));
      globalObj.backgroundMode = 'D';
    }
    else {
      dispatch(backgroundModeToggle('L'));
      globalObj.backgroundMode = 'L';
    }
    localStorage.setItem('matket-environment-variables', JSON.stringify(globalObj));
  };

  const renderBackgroundModeIcon = useCallback(() => {
    const backgroundMode = environmentVariables.backgroundMode;
    switch(backgroundMode) {
      case 'L':
        return (
          <img 
            src={ image1.src }
            className="w-[20px] h-[20px]"
          ></img>
        );
      case 'D':
        return (
          <img 
            src={ image2.src }
            className="w-[20px] h-[20px]"
          ></img>
        );
      // default:
      //   return (
      //     <img 
      //       src={ image1.src }
      //       className="w-[20px] h-[20px]"
      //     ></img>
      //   );
    }
  }, [ environmentVariables.backgroundMode ]);

  // 배경 dark / light 모드는 로컬 스토리지를 통해 저장 예정
  return (
    <div className="flex flex-col items-center justify-center gap-[10px] p-[10px]">
      <div className="item-center">
        { renderBackgroundModeIcon() }
      </div>
      <div>
        <input type="checkbox" className="toggle" onClick={ toggle } />
      </div>
    </div>
  );
}

export default BackgroundModeToggle;