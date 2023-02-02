const {Router} = require('express');
const fs = require('fs');
const short = require('short-uuid');
const {convertCSVToObject} = require('../utils/index')

const router = Router();

router.get('/', async (req, res) => {
    //  Here we are reading user's data from the file
    const fileData = fs.readFileSync("users.csv").toString();
    // /**
    //  * Convert the file data to an array using the new line character as delimiter
    //  */
    // const fileDataArray = fileData.split("\n");
    // /**
    //  * Now we get the header form the csv file, to be used to create objects
    //  */
    // const keys = fileDataArray[0].split(',').map(k => k.toLowerCase());
    // /**
    //  * Filter the data by removing empty string, since empty string
    //  * are not valid data...
    //  * 
    //  */
    // const usersData = fileDataArray.slice(1);
    // /**
    //  * Filter return an array with the  elements that pass a condition
    //  */
    // let usersStrings = usersData.filter(userString => Boolean(userString));

    // const users = usersStrings.map((userString) => {
    //     // userString = "8Kgb3uUpKGKpvirY2zm9GV,Tumasang Ndeh,tumasang.ndeh@gmail.com,24"
    //     const fields = userString.split(",");
    //     // fields = [ '8Kgb3uUpKGKpvirY2zm9GV', 'Tumasang Ndeh', 'tumasang.ndeh@gmail.com', '24']
    //     let userObj = {};
    //     // keys = [ 'id', 'name', 'email', 'age' ]
    //     keys.forEach((key, index) => {
    //         // ('id', 0)
    //         userObj[key] = fields[index];
    //     })
    //     return userObj;
    // });

    const users = convertCSVToObject(fileData)

    res.status(200).json({data: users})
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

router.get('/:userId', async (req, res) => {

});


router.get('/userId', async (req, res) => {

});

module.exports = router;