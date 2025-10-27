import React from 'react';
import Spinner from './Spinner';

const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center p-6'>
      <Spinner size={56} />
    </div>
  );
};

export default Loading;
