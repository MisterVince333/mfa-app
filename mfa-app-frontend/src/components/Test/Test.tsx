import React, { FC } from 'react';


interface TestProps { }

const Test: FC<TestProps> = () => {
  return (
    <>
      <div className="container border border-2 rounded">
        <div className="row ">
          <div className="col-md-5 border-end" id='test'>
            <h1>test</h1>
          </div>
          <div className="col-md-7 p-5">
            <form noValidate>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                  />
                </div>
                <div className="mb-3">
                  <label>Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter surname"
                  />
                </div>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>
                <div className="mb-3">
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary ">
                    Next step - Configure 2FA
                  </button>
                </div>
                <p className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </p>
              </form>          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
