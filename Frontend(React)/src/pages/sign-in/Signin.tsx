import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Signin.css';
import { Button } from '@headlessui/react';

const Signin = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    if (item.length > 15 && item.endsWith('.com')) {
      setEmail(item);
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    setPassword(item); // Always update the password state
    // Resetting password error state on change
    setPassErr(false);

    // Validations
    if (item.length < 8 || !/[A-Z]/.test(item) || !/[a-z]/.test(item) || !/[0-9]/.test(item) || !/[!@#$%^&*]/.test(item)) {
      setPassErr(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!emailErr && !passErr) {
        try {
            console.log('Signing in with:', { email, password }); // Debugging log
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            // Check for a successful response
            if (response.ok) {
                setIsAuthenticated(true); // Set user as authenticated
                alert(data.message); // "Sign-in successful"
                navigate('/homepage');
            } else {
                console.error('Error response:', data); // Log the full error response
                alert(data.message || 'Sign-in failed'); // Show error message
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('An error occurred while signing in.');
        }
    } else {
        alert('Your Email or Password is Incorrect');
    }
};


  return (
    <div>
      <div className="login">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://www.shareicon.net/download/2017/06/05/886704_media_512x512.png"
              className="mx-auto h-20 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleEmail}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handlePassword}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account ?{' '}
              <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register your Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
