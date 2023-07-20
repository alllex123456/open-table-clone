import React from 'react';

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    city: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

const AuthModalInputs = ({ inputs, handleInputChange, isSignin }: Props) => {
  return (
    <div>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <>
            <input
              type="text"
              className="border rounded px-2 py-3 w-[49%]"
              placeholder="First name"
              value={inputs.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
            <input
              type="text"
              className="border rounded px-2 py-3 w-[49%]"
              placeholder="Last name"
              value={inputs.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </>
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          className="border rounded px-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          onChange={handleInputChange}
          name="email"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        {!isSignin && (
          <input
            type="phone"
            className="border rounded px-2 py-3 w-[49%]"
            placeholder="Phone"
            value={inputs.phone}
            onChange={handleInputChange}
            name="phone"
          />
        )}
        {!isSignin && (
          <input
            type="text"
            className="border rounded px-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            onChange={handleInputChange}
            name="city"
          />
        )}
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded px-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          onChange={handleInputChange}
          name="password"
        />
      </div>
    </div>
  );
};

export default AuthModalInputs;
