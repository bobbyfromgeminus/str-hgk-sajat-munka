const express = require('express');
const createError = require('http-errors');
const personService = require('./person.service');

// GET ALL PERSON
exports.findAll = (req, res, next) => {
    return personService.findAll(req.params.id)
        .then(people => {
            res.json(people);
        });
};

// GET ONE PERSON
exports.findOne = (req, res, next) => {
    return personService.findOne(req.params.id)
        .then(person => {
            if (!person) {
                return next(new createError.NotFound('Person is not found.'));
            }
            res.json(person);
        });
};

// CREATE A NEW PERSON
exports.create = (req, res, next) => {
    const {last_name, first_name, email} = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest('Missing properties!')
        )
    }

    const newPerson = new Person({
        firstName: first_name,
        lastName: last_name,
        email: email
    })

    return personService.create(newPerson)
        .then( createdPerson => {
            res.status(201);
            res.json(createdPerson);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// UPDATE A PERSON
exports.update = (req, res, next) => {
    const id = req.params.id;
    const { first_name, last_name, email} = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest('Missing properties!')
        )
    };
    const update = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };
    return personService.update(id, update)
        .then(person => {
            res.json(person);
        })
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });
};


// DELETE A PERSON
exports.delete = (req, res, next) => {
    return personService.delete(req.params.id)
        .then( () => res.json({}) )
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });
};