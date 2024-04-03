import "./sidebar.css"
import { RssFeed,Chat,PlayCircle,Group,Bookmarks,HelpOutline,WorkOutline,Event,School } from "@mui/icons-material"
import {Users} from '../../dummyData.js'
import CloseFriend from "../closefriend/CloseFriend"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListitem">
                <RssFeed className="sidebarIcon"/>
                <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListitem">
                <Chat className="sidebarIcon"/>
                <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListitem">
                <PlayCircle className="sidebarIcon"/>
                <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListitem">
                <Group className="sidebarIcon"/>
                <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListitem">
                <Bookmarks className="sidebarIcon"/>
                <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListitem">
                <HelpOutline className="sidebarIcon"/>
                <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListitem">
                <WorkOutline className="sidebarIcon"/>
                <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListitem">
                <Event className="sidebarIcon"/>
                <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListitem">
                <School className="sidebarIcon"/>
                <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>
          <button className="sidebarButton">Show More</button>
          <hr className="sidebarHr"/>
          <ul className="sidebarFriendList">
            {Users.map((u) => {
              return <CloseFriend key={u.id} user={u}/>
            })}
          </ul>
      </div>
    </div>
  )
}

