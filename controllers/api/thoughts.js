const router = require('express').Router();
const {Schema} = require('mongoose');
const { Thoughts, Users } = require('../../models');

module.exports = {
//router.get('', (req, res)=>{
all(req, res){
    Thoughts.find({})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
},

//router.get('/:id', (req, res)=>{
one(req, res){
    Thoughts.findOne({ _id: req.params.id })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
},

//router.post('/', (req,res)=>{
add(req, res){
    Thoughts.create({
        thoughtText: req.body.thoughtText,
        user: req.body.user
    })
        .then((data) => {
            Users.findOneAndUpdate({ _id: req.body.user },
                { $push: { thoughts: data._id } })
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
},

//router.put('/:id', (req, res)=>{
update(req, res){
    Thoughts.findOneAndUpdate({ _id: req.params.id },
        { thoughtText: req.body.thoughtText })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
},

//router.delete('/:id', (req, res)=>{
delete(req, res){
    Thoughts.deleteOne({ _id: req.params.id })
        .then((data) => {
            Users.findOneAndUpdate({ user: data.user },
                { $pull: { thoughts: req.params.id } })
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
},

//router.post('/:id/reactions', (req, res)=>{
addReaction(req, res){
    req.body.user = new Schema.Types.ObjectId(req.body.user);
    Thoughts.findOneAndUpdate({ _id: req.params.id },
        { $push: { reactions: req.body } })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
},

//router.delete('/:id/reactions/:reactId', (req, res)=>{  
deleteReaction(req, res){
    Thoughts.findOneAndUpdate({ _id: req.params.id },
        { $pull: { reactions: req.params.reactId } })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
},
}