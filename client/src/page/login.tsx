import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../auth/UserContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:1323/users/login", {
        username,
        password
      });

      console.log('Login successful:', response.data);
      const { name, role } = response.data.payload.user;
      const user = { username: name, role };
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user });
      roleRedirects(role);

      console.log(response.data.token)

    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to log in. Please check your credentials.');

    } finally {
      setLoading(false);
    }
  };

  const roleRedirects = (role: string) => {
    if (role === "client") {
      navigate("/dashboardclient");
    } else {
      navigate("/dashboardadmin");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-blue-500'> TestFAD</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full input input-bordered h-10'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Link to='/register' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2' type='submit' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : 'Login'}
            </button>
          </div>

          {error && <div className='text-red-500 mt-2'>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
