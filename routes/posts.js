const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
//몽구스 연동 참고 유튜브 https://www.youtube.com/watch?v=vjf774RKrLc

// 포스트들 가져오는 코드(2)
router.get('/', async (req,res)=>{
    try {
        const posts = await Post.find(); //몽구수에 있는 모든 포스트
        res.json(posts);
    }catch (err){
        res.json({message: err});
    }
});

// 특정 포스트 가져오는 코드(3)
router.get('/:postID', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.postID);
         res.json(post);
    } catch(err){
        res.json({message: err}); 
    }
}); 

// 특정 포스트 제거하는 코드(4)
router.delete('/:postID', async (req,res)=>{
    try{
        const removedPost = await Post.remove({_id: req.params.postID});
        res.json(removedPost);
    } catch(err){
        res.json({message: err}); 
    }
}); 

// 특정 포스트 수정하는 코드(5)
router.patch('/:postID', async (req,res)=>{
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postID},
            {$set : {title: req.body.title }});
        res.json(updatedPost);
    } catch(err){
        res.json({message: err}); 
    }
}); 

//포스트 입력하는 코드(1)
router.post('/', async (req,res)=>{
    console.log(req.body);
    const post =new Post({ 
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        res.json( {message: err });
    }
});
/* async 안하는 포스트 입력하는 코드
router.post('/', (req,res)=>{
    console.log(req.body);
    const post =new Post({ 
        title: req.body.title,
        description: req.body.description
    });
    post.save()
        .then(data =>{
            res.json(data);
        }) 
        .catch(err => {
            res.json({ message: err });
        });

});
*/

module.exports = router;





