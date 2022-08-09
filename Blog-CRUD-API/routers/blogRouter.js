const express = require('express');
const app = express();
app.use(express.json());
var blogModel = require('../models/blogModel')
var jwt = require('jsonwebtoken');


var router = express.Router();


var insertBlog = async (req,res)=>
{
    var token = req.headers.authorization;
    var dataFromPostman = req.body;
    var n=0;
    if(token=='')
    {
        res.status(400);
        res.send("you did not provide any token! please provide token ");
    }
    else
    {
        try{
            var data = jwt.verify(token,'1234567');

            var ob = new blogModel({
                title:dataFromPostman.title,
                slug:dataFromPostman.slug,
                description:dataFromPostman.description
            });
            var data = await ob.save();
            if(data==undefined)
            {
                res.status(400);
                res.send("can't insert todo");
            }
            else
            {
                res.status(200);
                res.send(data);
            }
        }
        catch(ob)
        {
            res.status(400);
            res.send(ob.message);
        }
    }
}

var readBlog =async (req,res)=>
{
    var token = req.headers.authorization;
    if(token=='')
    {
        res.status(400);
        res.send("you did not provide any token! please provide token ");
    }
    else
    {
        try{
            var data = jwt.verify(token,'1234567');

            var data = await blogModel.find();
            if(data[0]==undefined)
            {
                res.status(400);
                res.send("can't read blog");
            }
            else
            {
                res.status(200);
                res.send(data);
            }
            
        }
        catch(ob)
        {
            res.status(400);
            res.send(ob.message);
        }
    }
}

var removeBlog = async (req,res)=>
{
    var token = req.headers.authorization;
    var dataFromPostman = req.body;
    if(token=='')
    {
        res.status(400);
        res.send("you did not provide any token! please provide token ");
    }
    else
    {
        try{
            var data = jwt.verify(token,'1234567');

            var data = await blogModel.deleteOne({_id:dataFromPostman.id})
            if(data.deletedCount==0)
            {
                res.status(400);
                res.send("can't delete blog");
            }
            else
            {
                res.status(200);
                res.send(" data deleted");
            }
            
        }
        catch(ob)
        {
            res.status(400);
            res.send(ob.message);
        }
    }
}

var modifyBlog = async(req,res)=>
{
    var dataFromPostman = req.body;
    var token = req.headers.authorization;
    if(token=='')
    {
        res.status(400);
        res.send("you did not provide any token! please provide token ");
    }
    else
    {
        try{
            var data = jwt.verify(token,'1234567');

                var updateStatus = await blogModel.updateOne({_id:dataFromPostman.id},{$set:{title:dataFromPostman.title,slug:dataFromPostman.slug,description:dataFromPostman.description}})
                
                if(updateStatus.modifiedCount==0)
                {
                    res.status(400);
                    res.send("can't update the blog");
                }
                else
                {
                    
                    res.status(200);
                    res.send("blog have been updated");
                }
        }
        catch(ob)
        {
            res.status(400);
            res.send(ob.message);
        }
    }
}




var addComment = async (req,res)=>
{
    var dataFromPostman = req.body;
    var token = req.headers.authorization;
    if(token=='')
    {
        res.status(400);
        res.send("you did not provide any token! please provide token .");
    }
    else
    {
        try{
            var data = jwt.verify(token,'1234567');

                /*----------------------- */
                /*--Very Very Important-- */
                /*----------------------- */
                var blogData = await blogModel.find({_id:dataFromPostman.id});
                var arrOfComment = blogData[0].comment;
                arrOfComment.push(dataFromPostman.comment);
                console.log(arrOfComment);
                var addComment = await blogModel.updateOne({_id:dataFromPostman.id},{$set:{comment: arrOfComment}})
                
                
                if(addComment.modifiedCount==0)
                {
                    res.status(400);
                    res.send("can't add comment");
                }
                else
                {
                    
                    res.status(200);
                    res.send("comment added");
                }
        }
        catch(ob)
        {
            res.status(400);
            res.send(ob.message);
        }
    }
}



router.route('/createBlog')
    .post(insertBlog)
router.route('/blog')
    .get(readBlog)
router.route('/deleteBlog')
    .post(removeBlog)
router.route('/updateBlog')
    .post(modifyBlog)
router.route('/comment')
    .post(addComment);

    module.exports=router;