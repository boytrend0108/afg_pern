import { useNavigate, useParams } from 'react-router-dom';
import './ActivationPage.scss';
import { useEffect, useState } from 'react';
import { user } from '../../../entities/User';
import { MyLoader } from '../../../shared/ui/MyLoader/MyLoader';
import { MyButtonWhite } from '../../../shared/ui';

export const ActivationPage = () => {
  const { activationToken } = useParams();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!activationToken) {
      return;
    }
    setLoading(true);

    user.userAPI
      .activate(activationToken)
      .then(() => setActive(true))
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (activationToken === 'in-progress') {
    return (
      <div className="ActivationPage my-container">
        <h3>Registration completed successfully!</h3>
        <strong>Please confirm your email.</strong>
        <strong>We have sent a link to activate your account by email.</strong>
      </div>
    );
  }

  return (
    <div className="ActivationPage my-container">
      {loading && (
        <div className="ActivationPage__loader">
          <MyLoader />
        </div>
      )}
      {!loading && active && (
        <>
          <h3>Successful activation </h3>
          <MyButtonWhite
            onClick={() => navigate('/login')}
            style={{ width: '160px' }}
          >
            Login
          </MyButtonWhite>
        </>
      )}

      {!loading && !active && (
        <>
          <h3 className="ActivationPage__error">{error}</h3>
          <p className="ActivationPage__error">Рlease write to us in chat</p>
          <MyButtonWhite onClick={() => navigate('/')}>
            Go to home page
          </MyButtonWhite>
        </>
      )}
    </div>
  );
};
