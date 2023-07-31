import { convertToDisplayTime } from '@/utilities/convertToDisplayTime';
import React from 'react';
import { Time } from '@/utilities/convertToDisplayTime';

const Header = ({
  image,
  name,
  date,
  partySize,
}: {
  image: string;
  name: string;
  date: string;
  partySize: string;
}) => {
  const [day, time] = date.split('T');

  const formattedDate = new Date(day).toLocaleDateString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{formattedDate}</p>
            <p className="mr-6">
              {convertToDisplayTime(date.split('T')[1] as Time)}
            </p>
            <p className="mr-6">{partySize} people</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
