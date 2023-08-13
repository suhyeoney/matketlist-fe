'use client'

import localFont from 'next/font/local';
import Image, { StaticImageData } from 'next/image';

import { useRouter } from 'next/navigation';
import { useWindowSize } from '@hooks/useWindowSize';
import image1 from '@assets/icons/error-spanish.png';
import image2 from '@assets/icons/left-arrow.png';
import image3 from '@assets/icons/error-oops.png';

const YeongdeokBlueroad = localFont({
  src: './assets/fonts/YeongdeokBlueroad.woff'
});

const Error: React.FC = () => {

  const navigator = useRouter();
  const window = useWindowSize();
  console.log(window);

  return (
    <div 
      id="errorPage"
      className={`
        relative h-screen flex items-center justify-center overflow-hidden text-white
        ${ YeongdeokBlueroad.className }
    `}>
      <div className="absolute z-5 w-full h-full flex flex-col items-center justify-center gap-4">
        <Image
          src={ image1.src }
          alt=""
          width={ window.width }
          height={ window.height }
          className="w-full h-full opacity-[25%]"
        />
      </div>
      <Image
        src={ image3.src }
        alt=""
        width={ window.width / 3 }
        height={ window.width / 3 }
        className="
          absolute z-10 right-5 
          laptop:top-10
          tablet:top-15
          mobile:top-30
          smallest:top-40
      "/>
      <div className="absolute z-10 bottom-20 flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-4">
          { window.width >= 768 ?
          <div className="
            whitespace-normal
            laptop:text-[30px]
            tablet:text-[25px]
          ">
            페이지를 불러오는 과정에서 문제가 발생했습니다. 😱
          </div> :
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="
              whitespace-normal 
              mobile:text-[20px]
              smallest:text-[13px]
            ">
              페이지를 불러오는 과정에서
            </div>
            <div className="
              whitespace-normal 
              mobile:text-[20px]
              smallest:text-[13px]
            ">
              문제가 발생했습니다. 😱
            </div>
          </div>
          }
          <div className="
            whitespace-normal
            laptop:text-[30px]
            tablet:text-[25px] 
            mobile:text-[20px]
            smallest:text-[13px]
          ">
            다시 시도해보시겠어요?
          </div>
        </div>
        <button 
          onClick={() => navigator.push('/signIn')}
          className={`
            flex flex-row items-center justify-center gap-2 border-2 border-red-700 rounded-[10px] p-3 text-[20px]
        `}>
          <div className="flex flex-row items-center justify-center">
            { [ image2, image2, image2 ].map((e: StaticImageData, idx: number) => {
              return (
                <Image
                  key={ idx }
                  src={ e.src }
                  alt=""
                  width="10"
                  height="15"
                  className={`
                    w-[10px] h-[15px]
                    ${ idx === 0 ? 'animate-[hide_1s_infinite_600ms]' : 
                    idx === 1 ? 'animate-[hide_1s_infinite_300ms]' : 'animate-[hide_1s_infinite_0ms]' }
                  `}
                />
              );
            })}
          </div>
          <span>처음으로 돌아가기</span> 
        </button>
      </div>
    </div>
  )
};

export default Error;