import ProfilePic from '../assets/annonymous.png';

export default function UserList({user}) {
    console.log(user)
    return (
        <div>
            <div style={{display:'flex'}} className="my-4">
            <img src={user?.profilePicture || ProfilePic} alt="" className="rounded-circle" style={{width: '60px', height: '60px'}}/>
            <div>
            <h6 className="mt-2 ">{user?.name} {user?.lastName}</h6>
            <p style={{fontSize: '12px'}}>siema</p>
            </div>
            </div>
            <hr className="mx-4" style={{background: '#cecece'}}/>
        </div>
    )
}
