import { useContext, useRef, useState } from "react"
import "./share.css"
import { PermMedia,Label,Room,EmojiEmotions, Cancel } from "@mui/icons-material"
import {AuthContext} from '../../context/AuthContext.js'
import axios from 'axios'

export default function Share() {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef()
  const[file,setFile] = useState(null)

  const submitHandler = async(e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }
   
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("https://zamsocial-backend.vercel.app/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("https://zamsocial-backend.vercel.app/api/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  console.log(file, "file name ma kiya a raha ha  ");
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
            <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "Person/noAvatar.png"} alt="" />
            <input 
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
             />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} className="shareImg" alt="" />
            <Cancel className="shareCancelImg" onClick = {() => setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionsText">Photo or Video</span>
                    <input
                    style={
                      {display:"none"}
                    }
                    type="file" 
                    id="file" 
                    accept=".png,.jpeg,.jpg" 
                    onChange={(e) => setFile(e.target.files[0])}/>
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionsText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionsText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionsText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}
