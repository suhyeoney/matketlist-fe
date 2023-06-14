'use client'

type LoadingSpinnerProps = {
  color: string,
  depth: string,
  thickness: string,
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ color , depth, thickness }) => {
  
  const getBorderThickness = (thickness: string) => {
    switch (thickness) {
      case '2':
        return 'border-2';
      case '4':
        return 'border-2';
      case '8':
        return 'border-2';
      default:
        return 'border-1';
      }
  };

  const getBorderStyle = (color: string, depth: string) => {
    switch(color) {
      case 'red':
        switch (depth) {
          case '100':
            return 'border-red-100';
          case '200':
            return 'border-red-200';
          case '300':
            return 'border-red-300';
          case '400':
            return 'border-red-400';
          case '500':
            return 'border-red-500';
        }
      case 'purple':
        switch (depth) {
          case '100':
            return 'border-purple-100';
          case '200':
            return 'border-purple-200';
          case '300':
            return 'border-purple-300';
          case '400':
            return 'border-purple-400';
          case '500':
            return 'border-purple-500';
        }
    }
  };


  return (
    <div className="flex flex-col justify-center gap-2 items-center pt-[200px]">
      <div 
        className={ `w-12 h-12 rounded-full animate-spin ${ getBorderThickness(thickness) } border-solid ${ getBorderStyle(color, depth) } border-t-transparent`}
      ></div>
      <span className="my-[10px]">Loading...</span>
    </div>
  );
    
};

export default LoadingSpinner;