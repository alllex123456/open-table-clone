import React from 'react';

const Header = () => {
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src="" alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">name</h1>
          <div className="flex mt-3">
            <p className="mr-6">date</p>
            <p className="mr-6">date</p>
            <p className="mr-6">6 people</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
