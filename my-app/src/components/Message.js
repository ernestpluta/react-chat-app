import ProfilePic from '../assets/annonymous.png';
import './Message.css'
import Attach from './Attach';
import Arrow from '../assets/arrow.svg'
export default function Message({chat, handleSubmit, text, setText, img, setImage}) {
    return (
        <form className=" position-relative" onSubmit={handleSubmit}>
            <div className="text-center position-relative">
                <div>
                 <img src={chat.profilePicture || ProfilePic} alt="" style={{width: '90px', height: '90px'}} className="rounded-circle mt-3"/>
                 <div className="mt-2 fs-5" style={{color: '#333', fontWeight: 600}}>{chat?.name} {chat?.lastName}</div>
                 <div className="chat_user_status" style={chat.isOnline ? {background: '#27b738'} : {background: '#c43c3c'}}></div>
                </div>
            </div>

                <div className="d-flex align-items-center justify-content-center position-absolute " style={{bottom: '-290%', left: '10%'}}>
            <label htmlFor="img" style={{left:'12px', top: '-12px'}} className="position-relative">
                <Attach/>
            </label>
            <input type="file" id="img" accept="image/*" style={{display: 'none', bottom:'50%'}}  onChange={(e) => setImage(e.target.files[0])}/>
            <div>
                <input type="text" placeholder="Type a message" className="custom-input" onChange={(e) => setText(e.target.value)} value={text}/>
            </div>
            <div className="position-relative">
                <button type="submit" className="send_button position-absolute"> <img src={Arrow} alt=""/> </button>
            </div>
            </div>
        </form>
    )
}
