import './MySuccess.scss';

export const MySuccess = () => {
  return (
    <div className="MySuccess">
      <img
        src="/my-icons/success.svg"
        alt="success"
        className="MySuccess__img"
      />
      <p className="MySuccess__title">Thank you for your application</p>
      <p className="MySuccess__msg">Our manager will contact you shortly!</p>
    </div>
  );
};
