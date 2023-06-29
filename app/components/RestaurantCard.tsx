import React from 'react';
import Link from 'next/link';

const RestaurantCard = () => {
  return (
    <div className="w-64 min-h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/name`}>
        <img
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/49492017.webp"
          alt=""
          className="w-full h-36"
        />
        <div className="p-2">
          <h3 className="font-bold text-2xl mb-2">
            The Vault Bar at The Marmorosch Bucharest
          </h3>
          <div className="flex items-start">
            <p className="ml-2">2 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">Name</p>
            $$$
            <p>Place</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
