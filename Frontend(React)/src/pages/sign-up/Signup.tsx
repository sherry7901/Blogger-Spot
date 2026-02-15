import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [phonenumberErr, setPhonenumberErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    setNameErr(item.length < 4);
    setName(item);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    setEmailErr(!(item.length > 5 && item.endsWith('.com')));
    setEmail(item);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    const isValid =
      item.length >= 8 &&
      /[A-Z]/.test(item) &&
      /[a-z]/.test(item) &&
      /[0-9]/.test(item) &&
      /[!@#$%^&*]/.test(item);
    setPassErr(!isValid);
    setPassword(item);
  };

  const handlePhonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    const phoneNumberPattern = /^\+92\d{10}$/; // Adjust this pattern as necessary
    setPhonenumberErr(!phoneNumberPattern.test(item));
    setPhonenumber(item);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameErr && !emailErr && !passErr && !phonenumberErr) {
      try {
        const response = await axios.post('http://localhost:5000/api/signup', {
          name,
          email,
          password,
          phonenumber,
        });

        if (response.status === 201) {
          alert('You have been successfully registered with Blogger Spot');
          navigate('/'); // Redirect to login upon successful registration
        } else {
          setErrorMessage("Unexpected response from server");
        }
      } catch (error: any) {
        // Improved error handling
        const errorMsg = error.response?.data?.message || "Error registering user. Please try again.";
        setErrorMessage(errorMsg);
      }
    } else {
      setErrorMessage("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="signup">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://cpng.pikpng.com/pngl/s/327-3273038_k-233ptal-225lat-a-k-246vetkez-337re-bdquoblog.png"
            className="mx-auto h-25 w-20"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Your Name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleName}
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                />
                {nameErr && <p className="error">Name should be at least 4 characters</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleEmail}
                  required
                  autoComplete="email"
                  placeholder="@gmail.com"
                  className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {emailErr && <p className="error">Email must be at least 5 characters long and end with .com</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handlePassword}
                  required
                  autoComplete="current-password"
                  className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {passErr && (
                  <p className="error">
                    Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="text"
                  onChange={handlePhonenumber}
                  required
                  autoComplete="phonenumber"
                  placeholder="+92"
                  className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {phonenumberErr && <p className="error">Please enter a valid phone number</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
