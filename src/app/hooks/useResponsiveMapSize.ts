'use client'

import { useWindowSize } from '@hooks/useWindowSize';
import { detect } from 'detect-browser';
import { useEffect } from 'react';

const ResponsiveMapSize = (
  mapSize: string,
  setMapSize: React.Dispatch<React.SetStateAction<string>>
) => {
  const width = useWindowSize().width;
  const height = useWindowSize().height;
  const browser = detect();
  // 브라우저 종류 : ios(safari), chrome    
  const browserName = browser?.name;
  
  let result = '';

  console.log(browserName);
  useEffect(() => {
    switch(browserName) {
      case 'ios':
        // 소형 모바일
        if(width >= 300 && width < 360) {
          if(height < 570) {
            result = 'w-[300px] h-[270px]';
          }
        }
        // 중형 모바일
        if(width >= 360 && width < 400) {
          if(height >= 570 && height < 610) {
            result = 'w-[350px] h-[370px]';
            break;
          }
          if(height >= 610 && height < 650) {
            result = 'w-[350px] h-[400px]';
            break;
          }
          if(height >= 650 && height < 700) {
            result = 'w-[350px] h-[430px]';
            break;
          }
          if(height >= 700 && height < 760) {
            result = 'w-[350px] h-[470px]';
            break;
          }
          if(height >= 760 && height < 800) {
            result = 'w-[350px] h-[550px]';
            break;
          }
          if(height >= 800 && height < 850) {
            result = 'w-[350px] h-[550px]';
            break;
          }
        }
        // 대형 모바일
        if(width >= 400 && width < 450) {
          if(height >= 700 && height < 750) {
            result = 'w-[350px] h-[480px]';
            break;
          }
          if(height >= 750 && height < 800) {
            result = 'w-[350px] h-[510px]';
            break;
          }
        }
        // 소형 태블릿
        if(width >= 768 && width < 800) {
          if(height >= 900 && height < 950) {
            result = 'w-[700px] h-[700px]';
            break;
          }
        }
        // 일반 태블릿
        if(width >= 800 && width < 850) {
          if(height >= 1000 && height < 1120) {
            result = 'w-[750px] h-[850px]';
            break;
          }
          if(height >= 1120 && height < 1200) {
            result = 'w-[750px] h-[950px]';
            break;
          }
        }
        // 폴드형 모바일
        if(width >= 850 && width < 900) {
          if(height >= 1000 && height < 1050) {
            result = 'w-[800px] h-[780px]';
            break;
          }
        }
        // 가로특화형 태블릿
        if(width >= 1100 && width < 1150) {
          if(height >= 600 && height < 650) {
            result = 'w-[1000px] h-[370px]';
            break;
          }
        }
        // 랩탑 이상
        if(width >= 1150) {
            result = 'w-[1200px] h-[500px]';
            break;
        }

      case 'chrome':
      case 'crios':
        // 소형 모바일
        if(width >= 300 && width < 360) {
          if(height < 570) {
            result = 'w-[300px] h-[380px]';
            break;
          }
        }
        // 중형 모바일
        if(width >= 360 && width < 400) {
          if(height >= 570 && height < 610) {
            result = 'w-[350px] h-[370px]';
            break;
          }
          if(height >= 610 && height < 650) {
            result = 'w-[350px] h-[400px]';
            break;
          }
          if(height >= 650 && height < 700) {
            result = 'w-[350px] h-[430px]';
            break;
          }
          if(height >= 700 && height < 745) {
            result = 'w-[350px] h-[500px]';
            break;
          }
          if(height >= 745 && height < 790) {
            result = 'w-[350px] h-[540px]';
            break;
          }
          if(height >= 790 && height < 850) {
            result = 'w-[350px] h-[600px]';
            break;
          }
          if(height >= 850 && height < 900) {
            result = 'w-[350px] h-[640px]';
            break;
          }
        }
        // 대형 모바일
        if(width >= 400 && width < 450) {
          if(height >= 700 && height < 750) {
            result = 'w-[350px] h-[480px]';
            break;
          }
          if(height >= 750 && height < 800) {
            result = 'w-[350px] h-[510px]';
            break;
          }
          if(height >= 801 && height < 900) {
            result = 'w-[350px] h-[650px]';
            break;
          }
          if(height >= 900 && height < 950) {
            result = 'w-[350px] h-[680px]';
            break;
          }
        }
        // 소형 태블릿
        if(width >= 768 && width < 800) {
          if(height >= 900 && height < 1050) {
            result = 'w-[700px] h-[780px]';
            break;
          }
        }
        // 일반 태블릿
        if(width >= 800 && width < 850) {
          if(height >= 1000 && height < 1120) {
            result = 'w-[750px] h-[850px]';
            break;
          }
          if(height >= 1120 && height < 1200) {
            result = 'w-[750px] h-[940px]';
            break;
          }
          if(height >= 1200) {
            result = 'w-[750px] h-[1030px]';
            break;
          }
        }
        // 폴드형 모바일
        if(width >= 850 && width < 900) {
          if(height >= 1100 && height < 1150) {
            result = 'w-[800px] h-[860px]';
            break;
          }
        }
        // 가로특화형 태블릿
        if(width >= 1100 && width < 1150) {
          if(height >= 700 && height < 750) {
            result = 'w-[1000px] h-[460px]';
            break;
          }
        }
        // 랩탑 이상
        if(width >= 1150) {
          result = 'w-[1200px] h-[500px]';
          break;
        }
    }
    setMapSize(result);
  }, [ useWindowSize() ]);
};

export default ResponsiveMapSize;