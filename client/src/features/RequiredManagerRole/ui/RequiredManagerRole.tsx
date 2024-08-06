import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import { AdminPage } from '../../../pages/Admin/AdminPage';
import { isManagerCheck } from '../../../entities/User/helper/isManager';

export const RequiredManagerRole = () => {
  const { user } = useAppSelector((state) => state.user);
  const isManager = isManagerCheck(user);

  if (!isManager) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminPage>
      <Outlet />
    </AdminPage>
  );
};
