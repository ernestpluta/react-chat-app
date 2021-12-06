
export default function DeleteProfilePic({deleteImage, userPic}) {
  return (
    <div className="trash">
      <svg
        onClick={deleteImage}
        xmlns="http://www.w3.org/2000/svg"
        // style={showTrash ? {display: 'block'} : {display: 'none'}}
        style={userPic ? {display: 'block', width:'40px'} : {display: 'none'}}
        fill="none"
        viewBox="0 0 24 24"
        stroke="rgba(255,255,255,0.8)"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  );
}
