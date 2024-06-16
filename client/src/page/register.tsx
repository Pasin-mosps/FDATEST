import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navi = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:1323/users/signup", {
        username,
        password,
      });

      console.log('User registered successfully:', response.data);
      navi('/login')

    } catch (error) {
      if (error instanceof AxiosError) {
       
        if (error.response) {
          console.error('Registration failed:', error.response.data);
          setError(error.response.data);
      
        } else {
          console.error('Registration failed:', error.message);
          setError('An unexpected error occurred.');
        }
      } else {
     
        console.error('An unknown error occurred:', error);
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Register
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
            />
          </div>
          <Link to='/login' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
             have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2' type='submit' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : 'register'}
            </button>
          </div>
          {error && <div className='text-red-500 mt-2'>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
