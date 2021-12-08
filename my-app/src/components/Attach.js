import React from 'react';

export default function Attach() {
  return (
    <div className="position-absolute">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        style={{width: '30px', height: '30px', cursor: 'pointer'}}
        fill="none"
        viewBox="0 0 24 24"
        stroke="#000"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{width: '25px', height: '25px', cursor: 'pointer'}}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg>
    </div>
  );
}
