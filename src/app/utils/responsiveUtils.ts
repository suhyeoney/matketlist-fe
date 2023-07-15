'use client'

import { useWindowSize } from '@hooks/useWindowSize';
import { detect } from 'detect-browser';

const browser = detect();
// 브라우저 종류 : ios(safari), chrome

export const getResponsiveMapSize = () => {
  const width = useWindowSize().width;
  const height = useWindowSize().height;
  const browserName = browser?.name;

  console.log(browserName);
  switch(browserName) {
    case 'ios':
      // 소형 모바일
      if(width >= 300 && width < 360) {
        if(height < 570) {
          return 'w-[300px] h-[270px]';
        }
      }
      // 중형 모바일
      if(width >= 360 && width < 400) {
        if(height >= 570 && height < 610) {
          return 'w-[350px] h-[370px]';
        }
        if(height >= 610 && height < 650) {
          return 'w-[350px] h-[400px]';
        }
        if(height >= 650 && height < 700) {
          return 'w-[350px] h-[430px]';
        }
        if(height >= 700 && height < 760) {
          return 'w-[350px] h-[470px]';
        }
        if(height >= 760 && height < 800) {
          return 'w-[350px] h-[550px]';
        }
        if(height >= 800 && height < 850) {
          return 'w-[350px] h-[550px]';
        }
      }
      // 대형 모바일
      if(width >= 400 && width < 450) {
        if(height >= 700 && height < 750) {
          return 'w-[350px] h-[480px]';
        }
        if(height >= 750 && height < 800) {
          return 'w-[350px] h-[510px]';
        }
      }
      // 소형 태블릿
      if(width >= 768 && width < 800) {
        if(height >= 900 && height < 950) {
          return 'w-[700px] h-[700px]';
        }
      }
      // 일반 태블릿
      if(width >= 800 && width < 850) {
        if(height >= 1000 && height < 1120) {
          return 'w-[750px] h-[850px]';
        }
        if(height >= 1120 && height < 1200) {
          return 'w-[750px] h-[950px]';
        }
      }
      // 폴드형 모바일
      if(width >= 850 && width < 900) {
        if(height >= 1000 && height < 1050) {
          return 'w-[800px] h-[780px]';
        }
      }
      // 가로특화형 태블릿
      if(width >= 1100 && width < 1150) {
        if(height >= 600 && height < 650) {
          return 'w-[1000px] h-[370px]';
        }
      }
      // 랩탑 이상
      if(width >= 1150) {
        if(height < 800) {
          return 'w-[1200px] h-[500px]';
        }
      }

    case 'chrome':
      // 소형 모바일
      if(width >= 300 && width < 360) {
        if(height < 570) {
          return 'w-[300px] h-[380px]';
        }
      }
      // 중형 모바일
      if(width >= 360 && width < 400) {
        if(height >= 570 && height < 610) {
          return 'w-[350px] h-[370px]';
        }
        if(height >= 610 && height < 650) {
          return 'w-[350px] h-[400px]';
        }
        if(height >= 650 && height < 700) {
          return 'w-[350px] h-[430px]';
        }
        if(height >= 700 && height < 745) {
          return 'w-[350px] h-[500px]';
        }
        if(height >= 745 && height < 790) {
          return 'w-[350px] h-[540px]';
        }
        if(height >= 790 && height < 850) {
          return 'w-[350px] h-[600px]';
        }
        if(height >= 850 && height < 900) {
          return 'w-[350px] h-[640px]';
        }
      }
      // 대형 모바일
      if(width >= 400 && width < 450) {
        if(height >= 700 && height < 750) {
          return 'w-[350px] h-[480px]';
        }
        if(height >= 750 && height < 800) {
          return 'w-[350px] h-[510px]';
        }
        if(height >= 801 && height < 900) {
          return 'w-[350px] h-[650px]';
        }
        if(height >= 900 && height < 950) {
          return 'w-[350px] h-[680px]';
        }
      }
      // 소형 태블릿
      if(width >= 768 && width < 800) {
        if(height >= 900 && height < 1050) {
          return 'w-[700px] h-[780px]';
        }
      }
      // 일반 태블릿
      if(width >= 800 && width < 850) {
        if(height >= 1000 && height < 1120) {
          return 'w-[750px] h-[850px]';
        }
        if(height >= 1120 && height < 1200) {
          return 'w-[750px] h-[940px]';
        }
        if(height >= 1200) {
          return 'w-[750px] h-[1030px]';
        }
      }
      // 폴드형 모바일
      if(width >= 850 && width < 900) {
        if(height >= 1100 && height < 1150) {
          return 'w-[800px] h-[860px]';
        }
      }
      // 가로특화형 태블릿
      if(width >= 1100 && width < 1150) {
        if(height >= 700 && height < 750) {
          return 'w-[1000px] h-[460px]';
        }
      }
      // 랩탑 이상
      if(width >= 1150) {
        if(height >= 800) {
          return 'w-[1200px] h-[550px]';
        }
      }
  }
};