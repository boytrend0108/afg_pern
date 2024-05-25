import React from 'react';
import './MyButton.scss';

type Props = {
  children: React.ReactNode;
  style?: {
    width?: string;
    height?: string;
    fontSize?: string;
    backgroundColor?: string;
    margin?: string;
  };
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const MyButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className="MyButton" {...props}>
      {children}
    </button>
  );
};
