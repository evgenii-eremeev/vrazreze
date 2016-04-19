'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

const Category = require('../models/category');
const Drawing = require('../models/drawing');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/multer');

// from authMiddleware
const isLoggedIn = authMiddleware.isLoggedIn;
const isAdmin = authMiddleware.isAdmin;

const router = express.Router();

// categories
router.get('/api/categories', function _categories (req, res) {
    Category
        .find()
        .sort({ position: 1 })
        .exec(function (err, categories) {
            if (err) { throw err; }
            res.json(categories)
        });
});

// category:url
router.get('/api/category/:url', function _category (req, res) {
    Category
        .findOne({ url: req.params.url })
        .exec(function (err, category) {
            if (err) { throw err; }
            if (!category) {
                return res.sendStatus(404);
            }
            Drawing
                .find({ category: category._id })
                .exec(function (err, drawings) {
                    if (err) { throw err; }
                    res.json(drawings);
                });
        });
});

// add_category
router.post(
    '/api/add_category', 
    isLoggedIn, 
    isAdmin, 
    function _addCategory(req, res) {
    
        const category = new Category({
            name: req.body.formData.name,
            url: req.body.formData.url,
            position: req.body.formData.position
        });
        category.save(function(err, category) {
            res.json(category);
        });
});

// update_category
router.post(
    '/api/update_category/:categoryId',
    isLoggedIn,
    isAdmin,
    function updateCategory(req, res) {
        
        Category.findByIdAndUpdate(
            req.params.categoryId,
            {
                name: req.body.formData.name, // same as { $set: {...}}
                url: req.body.formData.url,
                position: req.body.formData.position
            },
            { new: true }, // returns updated model in callback
            function(error, category) {
                if (error) { throw error; }
                res.json(category);
            }
        );
});

// delete_category
router.delete(
    '/api/delete_category/:categoryId', 
    isLoggedIn, 
    isAdmin, 
    function _deleteCategory(req, res) {
        
        Category.findByIdAndRemove(
            req.params.categoryId,
            function(err, category) {
                if (err) { throw err; }
                res.status(200).end();
            }
        );
});

// new_drawing
router.post(
    '/api/new_drawing', 
    isLoggedIn,
    isAdmin,
    upload.single('picture'), 
    function _newDrawing (req, res) {
        
        Category
            .findOne({ name: req.body.category })
            .exec(function (err, category) {
                if (err) { throw err; }
                const drawing = new Drawing({
                    title: req.body.title,
                    author: req.user.username,
                    description: req.body.description,
                    category: category._id,
                    drawing_composition: req.body.drawing_composition ?
                        req.body.drawing_composition.split(',') : [],
                    tags: req.body.tags ?
                        req.body.tags.split(',') : [],
                    price: req.body.price,
                    picture: req.file ? req.file.filename : ''
                });
                drawing.save(function (err, drawing) {
                    if (err) { throw err; }
                    res.json(drawing);
                });
            });
});

// delete_drawing
router.delete(
    '/api/delete_drawing/:drawingId', 
    isLoggedIn,
    isAdmin,
    function _deleteDrawing(req, res) {
        
        Drawing.findByIdAndRemove(
            req.params.drawingId,
            function(err, drawing) {
                if (err) { throw err; }
                const picPath = path.join(
                    process.cwd(),
                    '/public/pics/',
                    drawing.picture
                );
                fs.unlink(picPath, function (err) {
                    if (err) {
                        console.error("Error unlinking file", err);
                        return res.status(206).end('Error unlinking file');
                    }
                    res.status(200).end();
                });
            }
        );
});


module.exports = router