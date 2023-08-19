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

  const windowSize = useWindowSize();

  return (
    <div className="absolute z-0">
      <video 
        loop 
        autoPlay 
        muted 
        playsInline 
        className="fixed top-0 left-0 pointer-events-none filter grayscale w-full"
    >
        <source src={ video1_narrow } type="video/mp4" />
      </video>
    </div>
  );
};

export default Background;