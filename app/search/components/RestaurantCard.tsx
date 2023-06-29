import React from 'react';
import Link from 'next/link';

const RestaurantCard = () => {
  return (
    <div className="border-b flex pb-5 ml-4">
      <img
        src="https://resizer.otstatic.com/v2/photos/xlarge/2/49492017.webp"
        alt=""
        className="w-44 h-36 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">The Vault Bar at The Marmorosch Bucharest</h2>
        <div className="flex items-start">
          <div className="flex mb-2">5 reviews</div>
          <p className="ml-2 text-sm">Rating</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            $$$
            <p className="mr-4 capitalize">Cuisine</p>
            <p className="mr-4 capitalize">Location</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/name`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
