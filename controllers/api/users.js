const router = require('express').Router();
const { Users, Thoughts } = require('../../models');

router.get('/:id', async (req, res) => {
    const user = await Users.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');

    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(400).json({ message: 'no user found' });
    }
});

router.get('', async (req, res) => {
    const users = await Users.find({});
    if (users) {
        res.status(200).json(users);
    }
    else {
        res.status(400).json({ message: 'no users found' });
    }
});

router.post('/', async (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email
    }
    Users.create(user)
        .then((dbUser) => res.status(200).json(dbUser))
        .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    Users.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
    Users.findOneAndDelete({ _id: req.params.id })
        .then((item) => {
            Thoughts.deleteMany(item.thoughts.map(tought => {
                return thought._id;
            })
            )
        })
        .then((data) => res.status(200).json({ message: 'successfully deleted user and associated comments' }))
        .catch((err) => res.status(500).json({ message: 'unable to delete user, user may not exist' }));
});

router.post('/:userId/friends/:friendsId', async (req, res)=>{
    Users.findOne({_id:req.params.userId})
    .then((data)=> {
        data.friends.push(req.params.friendsId);
        Users.updateOne({_id:req.params.userId}, data.friends)
        .then((data)=>res.status(200).json(data))
        .catch((err)=>res.status(500).json(err));
    });      
});

router.delete('/:userId/friends/:friendsId', (req, res)=>{
    Users.findOne({_id:req.params.userId})
    .then((data)=>{
        data.friends.splice(data.friends.indexOf(req.params.id), 1);
        Users.updateOne({_id:req.params.userId}, data.friends)
        .then((data)=>res.status(200).json(data))
        .catch((err)=> res.status(500).json(err));
    });
});

module.exports = router;