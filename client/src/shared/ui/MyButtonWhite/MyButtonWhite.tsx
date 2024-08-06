import React from 'react';
import './MyButtonWhite.scss';

type Props = {
  children: React.ReactNode;
  style?: { width?: string; height?: string; fontSize?: string };
  className?: string;
  onClick?: () => void;
};

export const MyButtonWhite: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className="MyButtonWhite" {...props}>
      {children}
    </button>
  );
};
