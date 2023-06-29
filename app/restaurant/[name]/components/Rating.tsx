import React from 'react';
import Stars from '@/app/components/Stars';

const Rating = () => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars />
        <p className="text-reg ml-3">*****</p>
      </div>
      <div>
        <p className="text-reg ml-4">2 reviews</p>
      </div>
    </div>
  );
};

export default Rating;
