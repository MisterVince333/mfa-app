import React, { FC } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import ReCAPTCHA from "react-google-recaptcha";


interface LoginProps { }

const Login: FC<LoginProps> = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [otp, setOtp] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const navigate = useNavigate();


  const onLogin = (event: React.FormEvent) => {
    event.preventDefault();
    UserService.login(email, password, Number(otp)).then((res) => {
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate('/');
      } else {
        setError(res.data.error)
      }
    });
  }

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <form className="container w-50 border rounded bg-white p-5" onSubmit={onLogin}>
        <h3 className='text-center fw-bold'>Login</h3>
        {error && (
          <p className="alert alert-danger"> {error} </p>
        )}
        <div className="mb-3">
          <label>Email address</label>
          <input
            value={email}
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            value={password}
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>2FA</label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span className='m-1'></span>}
            isInputNum
            errorStyle="bg-black"
          />
        </div>
        <ReCAPTCHA 
                sitekey="6LeYtiMjAAAAAL7JZWl45OTMlMl0z-QshGuqtpWv"
                // sitekey={process.env.REACT_APP_SITE_KEY}
                className='mb-3'
                />
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <p className="text-center">
          Don't have an account? <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
