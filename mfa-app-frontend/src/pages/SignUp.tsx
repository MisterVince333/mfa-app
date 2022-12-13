import React, { FC, useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Navigate, useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import ReCAPTCHA from "react-google-recaptcha";




interface SignUpProps { }

const SignUp: FC<SignUpProps> = () => {
  const [state, setState] = useState('form')
  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [secret, setSecret] = React.useState<string>('');
  const [qr, setQr] = React.useState<string>('');
  const [otp, setOtp] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const navigate = useNavigate();

  const onNextClick = (event: React.FormEvent) => {
    event.preventDefault();
    if (name === '' || surname === '' || email === '' || password === '') {
      setError('Please make sure all fields are filled in correctly.');
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
      } else {
        UserService.check_email(email).then((res) => {
          if (!res.data.exists) {
            setState('qr');
            UserService.generate_qr().then((res) => {
              setQr(res.data.qr);
              setSecret(res.data.secret);
              setError('');

            });
          } else {
            setError('Account with this email already exists.');
          }
        });
      }
    }
  }

  const onBackClick = () => {
    setPassword('')
    setState('form');
  }

  const onRegisterClick = () => {
    UserService.check_otp(secret, Number(otp)).then((res) => {
      if (res.data.correct) {
        UserService.register(name, surname, email, password, secret).then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            navigate('/');
          }
        });
      } else {
        setError('OTP is incorrect');
      }
    });
  };


  return (
    <>
      <div>
        <div className="container d-flex align-items-center justify-content-center vh-100">
          <div className="container w-50 border rounded bg-white p-5">
            <h3 className='text-center fw-bold'>Sign Up</h3>
            {state === 'form' && (
              <form onSubmit={onNextClick} noValidate>
                {error && (
                  <p className="alert alert-danger"> {error} </p>
                )}
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    value={name}
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Surname</label>
                  <input
                    value={surname}
                    type="text"
                    className="form-control"
                    placeholder="Enter surname"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    value={email}
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary ">
                    Next step - Configure 2FA
                  </button>
                </div>
                <p className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </p>
              </form>

            )}

            {state === 'qr' && (
              <>
                <div className="text-center">
                  {error && (
                    <p className="alert alert-danger"> {error} </p>
                  )}

                  <img src={qr}></img>
                  <div className="d-flex justify-content-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span className='m-1'></span>}
                    isInputNum
                    errorStyle="bg-black"
                  />
                  </div>
                  <button onClick={onBackClick} className="btn btn-secondary">Back</button>
                  <button onClick={onRegisterClick} className="btn btn-primary">Register</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
