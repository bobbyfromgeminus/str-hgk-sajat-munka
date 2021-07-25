const express = require("express");
const controller = require('./person.controller');

const router = express.Router();

// Create
router.post('/', (req, res, next) => {
    return controller.create(req, res, next);
});

// Read
    // Get all
    router.get('/', (req, res, next) => {
        return controller.findAll(req, res, next);
    });

    // Get one
    router.get('/:id', (req, res, next) => {
        return controller.findOne(req, res, next);
    });

// Update
router.put('/:id', (req, res, next) => {
    return controller.update(req, res, next);
});

// Delete
router.delete('/:id', (req, res, next) => {
    return controller.delete(req, res, next);
});

module.exports = router;