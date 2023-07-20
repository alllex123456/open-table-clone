import React from 'react';
import Image from 'next/image';

import errorIcon from '../../public/icons/error.png';

const NotFound = () => {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorIcon} alt="error" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Not Found</h3>
        <p className="text-reg font-bold">
          We were unable to find a restaurant
        </p>
      </div>
      <p className="mt-6 text-sm font-light">Error Code: 404</p>
    </div>
  );
};

export default NotFound;
