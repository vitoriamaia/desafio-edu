import { loginApi, registerApi } from '@/api/authentication';
import { validateEmail } from '@/utilities/validations';
import PropTypes from 'prop-types';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import './Authentication.css';

export enum PageType {
  LOGIN = "login",
  REGISTER = "register",
}

interface AuthenticationProps {
  pageType: PageType;
}

const initialErrorsState = {
  email: '',
  password: '',
  api: '',
};

const Authentication: React.FC<AuthenticationProps> = ({ pageType }) => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['jwt']);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState(initialErrorsState);
  const [registerErrors, setRegisterErrors] = useState(initialErrorsState);

  const handleLoginEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };

  const handleRegisterEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterEmail(e.target.value);
  };

  const handleRegisterPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, type: PageType) => {
    e.preventDefault();

    if (type === PageType.LOGIN) {
      const newErrors: typeof initialErrorsState = { ...initialErrorsState };
      const [result, error] = await loginApi({
        user: {
          email: loginEmail,
          password: loginPassword,
        }
      });

      if (!error) {
        const token = result.headers.get("Authorization");
        console.log("Authorization Token:", token);
        setCookie('jwt', token, { path: '/' });
        console.log("Logged successfully");

        navigate('/Student');
      } else {
        newErrors.api = error;
        setLoginErrors(newErrors);
      }
    } else {
      const newErrors: typeof initialErrorsState = { ...initialErrorsState };
      if (!validateEmail(registerEmail)) {
        newErrors.email = 'Invalid email';
      }
      setRegisterErrors(newErrors);
      if (Object.values(newErrors).some(error => error !== '')) {
        return;
      }
      const [result, error] = await registerApi({
        user: {
          email: registerEmail,
          password: registerPassword,
        }
      });

      if (error) {
        newErrors.api = error;
        setRegisterErrors(newErrors);
      } else {
        console.log("API Response:", result);
        const message = result.message;
        const user = result.data;

        console.log("message:", message);
        console.log("user:", user);
        setCookie('jwt', result.headers.get("Authorization"), { path: '/' });
        navigate('/Student');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute top-4 left-4">
        <Link className="btn-primary-content btn px-16" to="/">
          Go back
        </Link>
      </div>
      <section className="bg-white p-6 rounded-lg shadow-lg flex w-3/4 max-w-4xl">
        <div className="box-element-line w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Login Page</h1>
          <p className="mb-4">
            Entre na sua conta para continuar seus estudos!
          </p>
          <form onSubmit={(e) => handleSubmit(e, PageType.LOGIN)}>
            <input
              type="email"
              name="email"
              className="text-input mb-2 p-2 border rounded w-full"
              value={loginEmail}
              onChange={handleLoginEmailChange}
              placeholder="Email"
            />
            {loginErrors.email && <p className="text-sm text-medium text-red-500 mt-1">{loginErrors.email}</p>}

            <input
              type="password"
              name="password"
              className="text-input mb-2 p-2 border rounded w-full"
              value={loginPassword}
              onChange={handleLoginPasswordChange}
              placeholder="Password"
            />
            {loginErrors.password && <p className="text-sm text-medium text-red-500 mt-1">{loginErrors.password}</p>}

            <button className="btn-primary btn w-full mt-4" type="submit">
              Login
            </button>

            {loginErrors.api && <p className="text-sm text-medium text-red-500 mt-1">{loginErrors.api}</p>}
          </form>
        </div>
        <div className="box-element-line w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Register Page</h1>
          <p className="mb-4">
            Cadastre-se para iniciar seus estudos!
          </p>
          <form onSubmit={(e) => handleSubmit(e, PageType.REGISTER)}>
            <input
              type="email"
              name="email"
              className="text-input mb-2 p-2 border rounded w-full"
              value={registerEmail}
              onChange={handleRegisterEmailChange}
              placeholder="Email"
            />
            {registerErrors.email && <p className="text-sm text-medium text-red-500 mt-1">{registerErrors.email}</p>}

            <input
              type="password"
              name="password"
              className="text-input mb-2 p-2 border rounded w-full"
              value={registerPassword}
              onChange={handleRegisterPasswordChange}
              placeholder="Password"
            />
            {registerErrors.password && <p className="text-sm text-medium text-red-500 mt-1">{registerErrors.password}</p>}
            <button className="btn-primary btn w-full mt-4" type="submit">
              Register
            </button>

            {registerErrors.api && <p className="text-sm text-medium text-red-500 mt-1">{registerErrors.api}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

Authentication.propTypes = {
  pageType: PropTypes.oneOf([PageType.LOGIN, PageType.REGISTER]).isRequired,
};

export default Authentication;


