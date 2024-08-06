import React from 'react';
import './MyBreadcrumb.scss';
import { Link } from 'react-router-dom';

type Breadcrumb = {
  id: number;
  name: string;
  path: string;
};

type Props = {
  breadcrumbs: Breadcrumb[];
};

export const MyBreadcrumb: React.FC<Props> = ({ breadcrumbs }) => {
  return (
    <ul className="MyBreadcrumb">
      {breadcrumbs.map((br) => (
        <li className="MyBreadcrumb__item" key={br.id}>
          <Link to={br.path}>{br.name}</Link>
        </li>
      ))}
    </ul>
  );
};
