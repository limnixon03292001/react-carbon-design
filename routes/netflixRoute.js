const express = require('express');
const { saveTimeStamp, getSaveTimeStamp, saveMyList, getSaveList, checkIfListed, deleteFromList } = require('../controllers/netflixController');

const router = express.Router();


router.post('/save', saveTimeStamp);
router.get('/getSave', getSaveTimeStamp);

router.post('/save-my-list', saveMyList);
router.get('/getSaveList', getSaveList);
router.get('/checkListed', checkIfListed);
router.delete('/deleteList', deleteFromList)

module.exports = router;