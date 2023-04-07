const router = require('express').Router();
const {allUser, oneUser, addUser, updateUser, deleteUser, addFriend, deleteFriend} = require('../../controllers/api/users');

router.route('/').get(allUser);
router.route('/:id').get(oneUser);
router.route('/').post(addUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/:id/friends/:friendId').post(addFriend);
router.route('/:id/friends/:friendId').delete(deleteFriend);

module.exports = router;