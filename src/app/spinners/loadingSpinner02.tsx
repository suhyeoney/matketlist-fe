'use client'

const LoadingSpinner02: React.FC = () => {

  return (
    // <div className="flex flex-col justify-center gap-2 items-center pt-[200px]">
    //   <div 
    //     className={ `w-12 h-12 rounded-full animate-spin ${ getBorderThickness(thickness) } border-solid ${ getBorderStyle(color, depth) } border-t-transparent`}
    //   ></div>
    //   <span className="my-[10px]">Loading...</span>
    // </div>
    <>
    <button data-tooltip-target="tooltip-default" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default tooltip</button>
    <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Tooltip content
        <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
    </>
  );
    
};

export default LoadingSpinner02;