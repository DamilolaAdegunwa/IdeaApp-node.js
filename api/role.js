const RoleApis = () => {
    // const express = require('express');
    // const router = express.Router();
    // const mongoose = require('mongoose');
    // const Role = require('../models/Role');
    
    // Read-All API
    router.get('/', (req, res) => {
        Role.find()
            .then(roles => res.json(roles))
            .catch(err => res.status(400).json('Error: ' + err));
    });
    
    // Read API
    router.get('/:id', (req, res) => {
        Role.findById(req.params.id)
            .then(role => res.json(role))
            .catch(err => res.status(400).json('Error: ' + err));
    });
    
    // Create API
    router.post('/add', (req, res) => {
        const newRole = new Role({
            Id: req.body.Id,
            Name: req.body.Name,
            NormalizedName: req.body.NormalizedName,
            ConcurrencyStamp: req.body.ConcurrencyStamp
        });
        newRole.save()
            .then(() => res.json('Role added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    });
    
    // Update API
    router.patch('/update/:id', (req, res) => {
        Role.findById(req.params.id)
            .then(role => {
                role.Name = req.body.Name;
                role.NormalizedName = req.body.NormalizedName;
                role.ConcurrencyStamp = req.body.ConcurrencyStamp;
                role.save()
                    .then(() => res.json('Role updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });
    
    // Delete API
    router.delete('/:id', (req, res) => {
        Role.findByIdAndDelete(req.params.id)
            .then(() => res.json('Role deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
    });
};

module.exports = RoleApis;