const {Router} = require('express');
const fs = require('fs');
const short = require('short-uuid');
const {convertCSVToJSON} = require('../utils/index');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../utils/user.utilts');

const router = Router();

router.get('/', async (req, res) => {

    const users = getAllUsers();
 
    res.status(200).json({data: users})
});


router.get('/:userId', async (req, res) => {
    const user = getUserById(req.params.userId);
    res.status(200).json({ user });
});

router.post('/', async (req, res) => {
    try {
        // This is how you get the data from the front-end
        const user = req.body;

        fs.appendFileSync("users.csv", `${short.generate()},${Object.values(user).toString()}\n`)

        res.status(201).json({message: "Account successfully saved!"})
    } catch (e) {
        res.status(500).json({errorText: e.toString(), message: "Something went wrong on server"})
    }
});

// Update user
router.put('/:userId', async (req, res) => {
    const userData = req.body;
    const userId = req.params.userId;

    updateUser(userId, userData);

    res.status(200).json({message: "User was updated"})

});

// Delete user
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;

    deleteUser(userId);

    res.status(200).json({message: "User was deleted"})
});

module.exports = router;