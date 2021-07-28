const express = require('express');
const createError = require('http-errors');
const logger = require('../../config/logger');
const postService = require('./post.service');

// CREATE A NEW POST
exports.create = (req, res, next) => {
    const {title, body, author} = req.body;
    if (!title || !body || !author) {
        return next(
            new createError.BadRequest('Missing properties!')
        )
    }

    const postData = {
        title,
        body,
        author
    };

    return postService.create(postData)
        .then( createdPost => {
            res.status(201);
            res.json(createdPost);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};


// GET ONE POST
exports.findOne = (req, res, next) => {
    return postService.findOne(req.params.id)
        .then(post => {
            if (!post) {
                return next(new createError.NotFound('Post is not found.'));
            }
            res.json(post);
        })
        .catch( err => {
            return next(new createError.InternalServerError(err.message));
        });
};
