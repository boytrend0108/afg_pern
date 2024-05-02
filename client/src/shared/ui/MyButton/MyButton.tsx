import React from 'react';
import './MyButton.scss';

type Props = {
  children: React.ReactNode;
};

export const MyButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className="MyButton" {...props}>
      {children}
    </button>
  );
};
