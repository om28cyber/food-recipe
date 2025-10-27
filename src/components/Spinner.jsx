import React from 'react';

const Spinner = ({size=48}) => {
  const s = size;
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} role="status" aria-label="Loading">
      <svg width={s} height={s} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5"/>
        <path fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"
          d="M45 25a20 20 0 0 1-20 20">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
  );
};

export default Spinner;
