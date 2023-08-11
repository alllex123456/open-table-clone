import React from 'react';
import Link from 'next/link';
import { Cuisine, Location, PRICE } from '@prisma/client';

const SearchSideBar = async ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; location?: string; cuisine?: string };
}) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: '$',
      className: 'className="border w-full text-reg font-light ounded-l p-2"',
    },
    {
      price: PRICE.REGULAR,
      label: '$$',
      className: 'className="border w-full text-reg font-light p-2"',
    },
    {
      price: PRICE.EXPENSIVE,
      label: '$$$',
      className: 'className="border w-full text-reg font-light rounded-r p-2"',
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location, index) => (
          <Link
            key={index}
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            className="font-light text-reg capitalize"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine, index) => (
          <Link
            key={index}
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            className="font-light text-reg capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex justify-center">
          {prices.map((type, index) => (
            <Link
              key={index}
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price: type.price,
                },
              }}
              className={type.className}
            >
              {type.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
