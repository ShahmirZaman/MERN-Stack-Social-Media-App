import "./rightbar.css"
import {Users} from '../../dummyData.js'
import Online from "../online/Online"

export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  
  const HomeRightbar = () => {
    return(
      <>
        <div className="birthdayContainer">
            <img className="birthdayImg" src={`${PF}gift.png`}/>
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
          <img src={`${PF}ad.png`} className="rightbarAd"/>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          {Users.map((u) => {
            return <Online key={u.id} user={u}/>
          })}
        </ul>
      </>
    )
  };
  
  const ProfileRightbar = () => {
    return(
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"} </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
              <img src={`${PF}Person/1.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
              <img src={`${PF}Person/2.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
              <img src={`${PF}Person/3.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
              <img src={`${PF}Person/4.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
              <img src={`${PF}Person/5.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
              <img src={`${PF}Person/6.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}
