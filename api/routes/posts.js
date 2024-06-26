import express from 'express'
import Post from '../models/Post.js';
import User from '../models/user.js';

const postRoute = express.Router();
//Create a Post
postRoute.post("/",async(req,res) => {
    const newPost =  new Post(req.body)
    try{
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    }catch(error) {
        res.status(500).json(error)
    }
})
//Update a Post
postRoute.put("/:id",async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("The post has been updated")
        } else {
            res.status(403).json("Yon can update only your post")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})
//delete a Post
postRoute.delete("/:id",async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("The post has been deleted")
        } else {
            res.status(403).json("Yon can delete only your post")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})
//like/dislike a Post
postRoute.put("/:id/like",async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked")
        } else {
            await post.updateOne( { $pull: { likes:req.body.userId } });
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
//get a Post
postRoute.get("/:id",async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }
})
//get timeline posts
postRoute.get("/timeline/:userId",async(req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId:currentUser._id})
        const friendPosts =  await Promise.all(
            currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId})
        })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
})

//get user's all posts
postRoute.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { postRoute }