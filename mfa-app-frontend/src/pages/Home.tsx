import React, { FC } from 'react';

interface HomeProps { }

const Home: FC<HomeProps> = () => {

  const onLogoutClick = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className='text-center'>
          <h1>Home</h1>
          <p>You are logged in!</p>
          <button className="btn btn-primary fs-1 fw-bolder" onClick={onLogoutClick}>Logout</button>
        </div>
      </div>
    </>
  );
};


export default Home;
