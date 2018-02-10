var express = require('express');
var router = express.Router();
var app = express();

var BlogModel = require('./blog.model');

router.get('/', function (req, res, next) {
    console.log('Start: get request for Blogs');
    var resBlogList;
    BlogModel.find()
        .exec(function (err, resData) {
            if (err) {
                return res.status(500).json({
                    title: 'Error in getting data from blog',
                    error: err
                });
            } else{
                resBlogList = updateBlogId(resData);
            }
            res.status(200).json({
                message: 'Success',
                data: resBlogList
            });
        });
        console.log('End: get request for Blogs');
});

router.get('/:id', function (req, res, next) {
    BlogModel.findById(req.params.id, function (err, savedBlog) {
        if (err) {
            return res.status(500).json({
                title: 'Error while retrieving data for given id in Blog table',
                error: err
            });
        }
        if (!savedBlog) {
            return res.status(500).json({
                title: 'data not found for given id in Blog table',
                error: {savedBlog: 'data not found for given id in blog table'}
            });
        }
        res.status(200).json({
                message: 'Success',
                data: savedBlog
        });
    });
});

router.post('/', function (req, res, next) {
    console.log('Start: blog post');

    var blogModel = new BlogModel({
        title: req.body.title,
        categories: req.body.categories,
        content: req.body.content,
        createdOn: new Date()
    });
    blogModel.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Error while saving (post) data in blog',
                error: err
            });
        }
        res.status(201).json({
            message: 'Blog Created',
            data: result
        });
    });
    console.log('End: blog post');
});

router.patch('/:id', function (req, res, next) {
    BlogModel.findById(req.params.id, function (err, savedBlog) {
        if (err) {
            return res.status(500).json({
                title: 'Error while retrieving data for given id in blog table',
                error: err
            });
        }
        if (!savedBlog) {
            return res.status(500).json({
                title: 'data not found for given id in Blog table',
                error: {savedBlog: 'data not found for given id in Blog table'}
            });
        }
        // set data to save
        savedBlog.title = req.body.title;
        savedBlog.categories = req.body.categories;
        savedBlog.content = req.body.content;
        savedBlog.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error while saving (patch) data in Blog',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Blog Updated',
                data: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    BlogModel.findById(req.params.id, function (err, savedBlog) {
        if (err) {
            return res.status(500).json({
                title: 'Error while retrieving data for given id in Blog table',
                error: err
            });
        }
        if (!savedBlog) {
            return res.status(500).json({
                title: 'data not found to delete for given blog in Blog table',
                error: {savedBlog: 'data not found to delete for given blog in Blog table'}
            });
        }
        savedBlog.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error while saving (patch) data in Blog',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Blog Deleted',
                data: result
            });
        });
    });
});

function updateBlogId(blogs){
    if(blogs && blogs.length > 0){
        for(var i = 0; i < blogs.length; i++){
            blogs[i].id = blogs[i]._id;
        }
    }
    return blogs;
}

module.exports = router;
