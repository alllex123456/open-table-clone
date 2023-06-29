import React from 'react';
import Link from 'next/link';

const SearchSideBar = () => {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>

        <Link
          href={{
            pathname: '/search',
            query: {},
          }}
          className="font-light text-reg capitalize"
          key="0"
        >
          name
        </Link>
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>

        <Link
          href={{
            pathname: '/search',
            query: {},
          }}
          className="font-light text-reg capitalize"
          key="0"
        >
          name
        </Link>
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: '/search',
              query: {},
            }}
            className=""
          >
            label
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
