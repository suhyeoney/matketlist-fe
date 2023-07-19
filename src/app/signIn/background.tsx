'use client'

// import video1_wide from '@assets/videos/matket-list-background1-wide.mp4';
// import video1_narrow from '@assets/videos/matket-list-background1-narrow.mp4';
// import video2 from '@assets/videos/matket-list-background2.mp4';
// import poster1 from '@assets/images/matket-list-background1-wide-medium-poster.png';
// import poster2 from '@assets/images/matket-list-background1-narrow-low-poster.png';
import video1_wide from '@assets/videos/matket-list-background1-wide-medium.mp4';
import video1_narrow from '@assets/videos/matket-list-background1-narrow-low.mp4';

import { useWindowSize } from '@hooks/useWindowSize';

const Background: React.FC = () => {

  return (
    <div className="absolute z-0">
      <video 
        loop 
        autoPlay 
        muted
        // playsInline
        // poster={ useWindowSize().width < 1024 ? poster2.src : poster1.src }
        className="fixed min-w-full min-h-full right-0 bottom-0"
      >
        <source src={ useWindowSize().width < 1024 ? video1_narrow : video1_wide } type="video/mp4" />
      </video>
      {/* <video 
        loop 
        autoPlay 
        muted
        className="
        laptop:w-full h-screen  
      ">
        <source src={ video2 } type="video/mp4" />
      </video> */}
    </div>
  );
};

export default Background;