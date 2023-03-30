const router = require('express').Router();
const {Thoughts, Users} = require('../../models');

router.get('', (req, res)=>{
    Thoughts.find({})
    .then((data)=>res.status(200).json(data))
    .catch((err)=>res.status(500).json(err));
});

router.get('/:id', (req, res)=>{
    Thoughts.findOne({_id:req.params.id})
    .then((data)=>res.status(200).json(data))
    .catch((err)=>res.status(500).json(err));
});

router.post('/', (req,res)=>{
    Thoughts.create({
        thoughtText:req.body.thoughtText,
        username:req.body.username
    })
    .then((data)=>{
        Users.findOneAndUpdate({_id:req.body.userId},
            {$addToSet:{thoughts:data._id}})
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch((err)=>res.status(500).json(err));
    })
    .catch((err)=>res.status(500).json(err));
});

router.put('/:id', (req, res)=>{
    Thoughts.findOneAndUpdate({_id:id},
        {thoughtText:req.body.thoughtText})
    .then((data)=>res.status(200).json(data))
    .catch((err)=>res.status(500).json(err));
});

router.delete('/:id', (req, res)=>{
    Thoughts.deleteOne({_id:id})
    .then((data)=>{
        Users.findOneAndUpdate({username:data.username},
            {$pull:{thoughts:req.params.id}})
            .then((data)=>res.status(200).json(data))
            .catch((err)=>res.status(500).json(err));
    })
    .catch((err)=>res.status(500).json(err));
});

router.post('/:id/reactions', (req, res)=>{
    Thoughts.findOneAndUpdate({_id:req.params.id},
        {$addToSet:{reactions:req.body}})
        .then((data)=>res.status(200).json(data))
        .catch((err)=>res.status(500).json(err));
});

router.delete('/:id/reactions/:reactId', (req, res)=>{  
    Thoughts.findOneAndUpdate({_id:req.params.id},
        {$pull:{reactions:req.params.reactId}})
        .then((data)=>res.status(200).json(data))
        .catch((err)=>res.status(500).json(err));
});

module.exports = router;