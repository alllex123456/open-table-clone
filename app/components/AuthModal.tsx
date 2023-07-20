'use client';

import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '@/hooks/useAuth';
import { AuthContextInstance } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const { loading, error } = useContext(AuthContextInstance);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignin) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.city &&
        inputs.phone
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (isSignin) {
      signin(inputs.email, inputs.password, handleClose);
    } else {
      const { email, password, firstName, lastName, city, phone } = inputs;
      signup(
        { email, password, firstName, lastName, city, phone },
        handleClose
      );
    }
  };

  return (
    <div>
      <button
        className={`${renderContent(
          'bg-blue-400 text-white',
          ''
        )} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent('Sign in', 'Sing up')}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="p-2 h-[600px] text-center">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                  {error && (
                    <Alert severity="error" className="mb-5">
                      {error}
                    </Alert>
                  )}
                  <p className="text-sm">
                    {renderContent('Sign In', 'Create Account')}
                  </p>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-light text-cente">
                    {renderContent(
                      'Sign in to your account',
                      'Create your OpenTable account'
                    )}
                  </h2>
                  <AuthModalInputs
                    inputs={inputs}
                    handleInputChange={handleInputChange}
                    isSignin={isSignin}
                  />
                  <button
                    className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-500"
                    disabled={disabled}
                    onClick={handleSubmit}
                  >
                    {renderContent('Sign in', 'Create account')}
                  </button>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
