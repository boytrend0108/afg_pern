import { RotatingLines } from 'react-loader-spinner';

export const MyLoader = () => {
  return (
    <RotatingLines
      visible={true}
      width="96"
      strokeColor="black"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};
