const router = require('express').Router();
const thoughts = require('../../controllers/api/thoughts');

router.route('/').get(thoughts.all);
router.route('/:id').get(thoughts.one);
router.route('/').post(thoughts.add);
router.route('/:id').put(thoughts.update);
router.route('/:id').delete(thoughts.delete);
router.route('/:id/reactions').post(thoughts.addReaction);
router.route('/:id/reactions/:reactId').delete(thoughts.deleteReaction);

module.exports = router;